import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShieldAlt, FaTruck, FaClipboardList } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: ''
  });

  // Redirect to cart if it's empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + parsePrice(item.price) * (item.quantity || 1);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Strictly numeric validation for phone & pincode gracefully directly in handler
    if (name === 'phone' || name === 'pincode') {
      if (value !== '' && !/^[0-9]+$/.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Formal validation check before processing
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString(),
      customer: formData,
      items: cart,
      total: totalPrice
    };

    // Store in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('svshop_orders') || '[]');
    localStorage.setItem('svshop_orders', JSON.stringify([...existingOrders, newOrder]));

    alert("Order placed successfully!");
    
    // Cleanup & Redirect
    clearCart();
    navigate('/');
  };

  // Prevent render flicker while useEffect redirects empty carts
  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 sm:pt-36 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-8 text-center sm:text-left mt-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Secure Checkout</h1>
          <p className="mt-2 text-sm text-gray-500">Please provide your details to complete the order.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Form (60%) */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <FaTruck className="mr-3 text-green-600"/> Delivery Details
              </h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    maxLength="10"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
                    placeholder="9876543210"
                  />
                  <p className="mt-1 text-xs text-gray-500">10-digit mobile number</p>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none resize-none"
                    placeholder="123 Main Street, Appt 4B..."
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
                    placeholder="500001"
                  />
                </div>

                <div className="pt-6 mt-8 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full h-12 flex justify-center items-center px-8 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Place Order
                  </button>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500 gap-2">
                    <FaShieldAlt className="text-green-600" />
                    <span>Secure 128-bit Encrypted Checkout</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary (40%) */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                <FaClipboardList className="mr-3 text-green-600" /> Order Summary
              </h2>
              
              <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <ul className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <li key={item.id} className="py-4 flex justify-between items-center">
                      <div className="flex-1 pr-4">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{(parsePrice(item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p className="font-medium text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600 pb-4 border-b border-gray-100">
                  <p>Shipping</p>
                  <p className="font-medium text-green-600">Free</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-xl font-bold text-gray-900">Total</p>
                  <p className="text-3xl font-extrabold text-green-600 tracking-tight">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </p>
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
