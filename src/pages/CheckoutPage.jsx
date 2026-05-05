import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShieldAlt, FaTruck, FaClipboardList, FaLock, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

// ── Razorpay SDK loader ───────────────────────────────────────────────────────
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) { resolve(true); return; }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

// ── Payment method options ────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: 'online',
    label: 'Pay Online',
    sub: 'UPI · Cards · Net Banking · Wallets',
    icon: FaCreditCard,
    color: 'green',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sub: 'Pay when your order arrives',
    icon: FaMoneyBillWave,
    color: 'orange',
  },
];

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' | 'cod'
  const [isProcessing, setIsProcessing]   = useState(false);
  const [scriptLoaded, setScriptLoaded]   = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '', pincode: '',
  });

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) navigate('/cart');
  }, [cart, navigate]);

  // Pre-load Razorpay SDK (only needed for online payments)
  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setScriptLoaded(loaded);
      if (!loaded) console.error('Failed to load Razorpay SDK');
    });
  }, []);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + parsePrice(item.price) * (item.quantity || 1),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone' || name === 'pincode') && value !== '' && !/^[0-9]+$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill out all delivery fields.');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert('Please enter a valid 6-digit pincode.');
      return false;
    }
    return true;
  };

  // ── Save order to Firestore + localStorage ──────────────────────────────────
  const saveOrder = async ({ paymentId = null, paymentStatus, orderStatus, method }) => {
    const orderId = paymentId || ('ORD-' + Math.floor(100000 + Math.random() * 900000));
    const newOrder = {
      id:                  orderId,
      razorpay_payment_id: paymentId,
      timestamp:           new Date().toISOString(),
      customer:            formData,
      items:               cart.map((item) => ({
        id:       item.id,
        name:     item.name,
        price:    item.price,
        quantity: item.quantity || 1,
      })),
      total:         totalPrice,
      paymentStatus, // 'PAID' | 'COD'
      orderStatus,   // 'Confirmed' | 'Pending'
      paymentMethod: method, // 'Online' | 'COD'
    };

    // ── Step 1: Firestore write (BLOCKING — must succeed before redirect) ──────
    // If this throws, the caller catches it and shows an alert. No silent failures.
    console.log('Saving order to Firestore collection "orders"...', newOrder);
    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    console.log('✅ Order saved successfully. Firestore doc ID:', docRef.id);

    // ── Step 2: localStorage mirror (best-effort, never blocks redirect) ──────
    try {
      const existing = JSON.parse(localStorage.getItem('svshop_orders') || '[]');
      localStorage.setItem('svshop_orders', JSON.stringify([newOrder, ...existing]));
    } catch { /* non-critical, ignore */ }

    return { ...newOrder, _docId: docRef.id };
  };


  // ── COD handler ─────────────────────────────────────────────────────────────
  const handleCOD = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      const order = await saveOrder({
        paymentStatus: 'COD',
        orderStatus:   'Pending',
        method:        'COD',
      });
      clearCart();
      navigate('/success', {
        state: {
          paymentId:    'COD',
          orderId:      order.id,
          customerName: formData.fullName,
          total:        totalPrice,
          isCOD:        true,
        },
      });
    } catch (err) {
      console.error('❌ COD order Firestore error:', err);
      console.log('Error code:', err.code, '| Message:', err.message);
      alert(
        '⚠ Order could not be saved to the database.\n\n' +
        'Error: ' + (err.message || err.code || 'Unknown error') + '\n\n' +
        'Fix: Update Firestore security rules to allow unauthenticated writes to the "orders" collection.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Razorpay online payment handler ─────────────────────────────────────────
  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!scriptLoaded || !window.Razorpay) {
      alert('Payment gateway is loading. Please wait a moment and try again.');
      return;
    }

    setIsProcessing(true);

    // Amount MUST be in paise (1 INR = 100 paise). currency MUST be "INR".
    const amountInPaise = totalPrice * 100;

    const options = {
      key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:      amountInPaise,   // e.g. ₹500 → 50000
      currency:    'INR',           // explicitly required — prevents international card errors
      name:        'Sri Venkateshwara Co.',
      description: `Order of ${cart.length} item(s)`,
      prefill: {
        name:    formData.fullName,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
        pincode: formData.pincode,
      },
      theme: { color: '#16a34a' },

      handler: async function (response) {
        try {
          const order = await saveOrder({
            paymentId:     response.razorpay_payment_id,
            paymentStatus: 'PAID',
            orderStatus:   'Confirmed',
            method:        'Online',
          });
          clearCart();
          navigate('/success', {
            state: {
              paymentId:    response.razorpay_payment_id,
              orderId:      order.id,
              customerName: formData.fullName,
              total:        totalPrice,
              isCOD:        false,
            },
          });
        } catch (err) {
          console.error('❌ Post-payment Firestore save error:', err);
          console.log('Error code:', err.code, '| Message:', err.message);
          alert(
            '⚠ Payment received, but order could not be saved.\n\n' +
            'Payment ID: ' + response.razorpay_payment_id + '\n' +
            'Error: ' + (err.message || err.code || 'Unknown error') + '\n\n' +
            'Please contact us with your Payment ID so we can confirm your order.'
          );
          setIsProcessing(false);
        }
      },

      modal: {
        ondismiss: () => setIsProcessing(false),
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        console.error('Razorpay payment.failed:', response.error);
        alert(`Payment failed: ${response.error.description}. Please try again.`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay init error:', err);
      alert('Could not open payment gateway. Please refresh and try again.');
      setIsProcessing(false);
    }
  };

  // Route form submit to correct handler based on selected method
  const handleSubmit = (e) => {
    if (paymentMethod === 'cod') return handleCOD(e);
    return handleOnlinePayment(e);
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 sm:pt-36 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-8 text-center sm:text-left mt-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Secure Checkout</h1>
          <p className="mt-2 text-sm text-gray-500">Fill in your delivery details and choose how to pay.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column ── */}
          <div className="w-full lg:w-[60%] space-y-6">

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center border-b border-gray-100 pb-4">
                <FaTruck className="mr-3 text-green-600"/> Delivery Details
              </h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text" id="fullName" name="fullName" required
                    value={formData.fullName} onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel" id="phone" name="phone" required maxLength="10"
                    value={formData.phone} onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
                    placeholder="9876543210"
                  />
                  <p className="mt-1 text-xs text-gray-500">10-digit mobile number</p>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                  <textarea
                    id="address" name="address" rows="3" required
                    value={formData.address} onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none resize-none"
                    placeholder="123 Main Street, Appt 4B..."
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text" id="pincode" name="pincode" required maxLength="6"
                    value={formData.pincode} onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
                    placeholder="500001"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center border-b border-gray-100 pb-4">
                <FaCreditCard className="mr-3 text-green-600"/> Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map(({ id, label, sub, icon: Icon, color }) => {
                  const isSelected = paymentMethod === id;
                  const ring = color === 'green'
                    ? 'ring-green-500 border-green-500 bg-green-50'
                    : 'ring-orange-400 border-orange-400 bg-orange-50';
                  const iconColor = color === 'green' ? 'text-green-600' : 'text-orange-500';

                  return (
                    <button
                      key={id}
                      type="button"
                      id={`payment-${id}`}
                      onClick={() => setPaymentMethod(id)}
                      className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                        isSelected ? `${ring} ring-2` : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {/* Radio dot */}
                      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? color === 'green' ? 'border-green-500 bg-green-500' : 'border-orange-400 bg-orange-400'
                          : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Icon className={`${iconColor} text-base`} />
                          <span className="text-sm font-bold text-gray-900">{label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* COD note */}
              {paymentMethod === 'cod' && (
                <div className="mt-4 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
                  <FaMoneyBillWave className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-orange-700">
                    <strong>Cash on Delivery:</strong> You will pay ₹{totalPrice.toLocaleString('en-IN')} in cash when your order is delivered. Our team will contact you to confirm.
                  </p>
                </div>
              )}

              {/* Submit button */}
              <form onSubmit={handleSubmit} className="mt-6">
                <button
                  type="submit"
                  id="checkout-submit-btn"
                  disabled={isProcessing}
                  className={`w-full h-14 flex justify-center items-center gap-3 rounded-xl text-lg font-bold text-white shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
                    paymentMethod === 'cod'
                      ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400'
                      : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {paymentMethod === 'cod' ? 'Placing Order...' : 'Opening Payment Gateway...'}
                    </>
                  ) : paymentMethod === 'cod' ? (
                    <><FaMoneyBillWave /> Place Order — Pay on Delivery</>
                  ) : (
                    <><FaLock className="text-green-200" /> Pay ₹{totalPrice.toLocaleString('en-IN')} Online →</>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center text-xs text-gray-400 gap-2">
                  <FaShieldAlt className="text-green-600" />
                  {paymentMethod === 'cod'
                    ? 'No payment needed now. Pay cash at delivery.'
                    : 'Secured by Razorpay · 256-bit SSL Encrypted'}
                </div>
              </form>
            </div>
          </div>

          {/* ── Right Column — Order Summary ── */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center border-b border-gray-100 pb-4">
                <FaClipboardList className="mr-3 text-green-600" /> Order Summary
              </h2>

              <div className="max-h-80 overflow-y-auto pr-1">
                <ul className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between items-center">
                      <div className="flex-1 pr-3">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity || 1}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                        ₹{(parsePrice(item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p className="font-medium text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 pb-3 border-b border-gray-100">
                  <p>Shipping</p>
                  <p className="font-medium text-green-600">Free</p>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <p className="text-lg font-bold text-gray-900">Total</p>
                  <p className="text-3xl font-extrabold text-green-600 tracking-tight">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Payment method indicator in summary */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
                  paymentMethod === 'cod'
                    ? 'bg-orange-50 text-orange-700'
                    : 'bg-green-50 text-green-700'
                }`}>
                  {paymentMethod === 'cod'
                    ? <><FaMoneyBillWave /> Cash on Delivery selected</>
                    : <><FaCreditCard /> Pay Online selected</>
                  }
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500 text-center">
                <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-lg p-2">
                  <FaShieldAlt className="text-green-600 text-lg" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-lg p-2">
                  <FaTruck className="text-green-600 text-lg" />
                  <span>Free Delivery</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
