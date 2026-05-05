import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag, FaReceipt, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // Redirect to home if accessed directly without order state
  useEffect(() => {
    if (!state?.paymentId && !state?.orderId) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  const isCOD        = state?.isCOD || false;
  const paymentId    = state?.paymentId || 'N/A';
  const orderId      = state?.orderId || 'N/A';
  const customerName = state?.customerName || 'Valued Customer';
  const total        = state?.total || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-16 pt-28">
      <div className="w-full max-w-lg">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header Banner — green for paid, orange for COD */}
          <div className={`px-8 py-10 text-center relative overflow-hidden ${
            isCOD
              ? 'bg-gradient-to-r from-orange-500 to-amber-400'
              : 'bg-gradient-to-r from-green-600 to-emerald-500'
          }`}>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 animate-bounce-once">
              {isCOD
                ? <FaMoneyBillWave className="text-5xl text-orange-500" />
                : <FaCheckCircle className="text-5xl text-green-600" />
              }
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isCOD ? 'Order Confirmed!' : 'Payment Successful!'}
            </h1>
            <p className="mt-2 text-white/90 text-base">
              Thank you, <span className="font-bold text-white">{customerName}</span>!{' '}
              {isCOD ? 'Your COD order has been placed.' : 'Your payment was received.'}
            </p>
          </div>

          {/* Order Details */}
          <div className="px-8 py-6 space-y-4">

            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FaReceipt className="text-green-600" /> Order Details
              </h2>

              {/* Order ID */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="text-sm font-bold text-gray-900 font-mono truncate max-w-[55%] text-right">{orderId}</span>
              </div>
              <div className="border-t border-gray-200"></div>

              {/* Transaction ID / Payment method */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {isCOD ? 'Payment Method' : 'Transaction ID'}
                </span>
                {isCOD ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600">
                    <FaMoneyBillWave /> Cash on Delivery
                  </span>
                ) : (
                  <span className="text-sm font-bold text-gray-900 font-mono truncate max-w-[55%] text-right">{paymentId}</span>
                )}
              </div>
              <div className="border-t border-gray-200"></div>

              {/* Amount */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {isCOD ? 'Amount Due at Delivery' : 'Amount Paid'}
                </span>
                <span className={`text-lg font-extrabold ${isCOD ? 'text-orange-600' : 'text-green-600'}`}>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="border-t border-gray-200"></div>

              {/* Status badge */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Payment Status</span>
                {isCOD ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    COD — Pay at Delivery
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    PAID
                  </span>
                )}
              </div>
            </div>

            {/* Delivery note */}
            <div className={`flex items-start gap-3 rounded-2xl px-5 py-4 ${isCOD ? 'bg-orange-50' : 'bg-blue-50'}`}>
              <FaShoppingBag className={`mt-0.5 flex-shrink-0 text-lg ${isCOD ? 'text-orange-500' : 'text-blue-500'}`} />
              <div>
                <p className={`text-sm font-semibold ${isCOD ? 'text-orange-800' : 'text-blue-800'}`}>
                  {isCOD ? 'What happens next?' : 'Estimated Delivery'}
                </p>
                <p className={`text-sm mt-0.5 ${isCOD ? 'text-orange-700' : 'text-blue-600'}`}>
                  {isCOD
                    ? 'Our team will call you to confirm the delivery. Please keep ₹' + total.toLocaleString('en-IN') + ' ready in cash at the time of delivery.'
                    : 'Your order will be delivered within 3–5 business days. You will be contacted on your registered mobile number.'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/"
                id="success-back-home"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-md"
              >
                <FaHome /> Back to Home
              </Link>
              <Link
                to="/grab-it"
                id="success-continue-shopping"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
              >
                <FaShoppingBag /> Shop More
              </Link>
            </div>

          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-gray-400">
              {isCOD
                ? 'Keep this Order ID for reference.'
                : 'Keep your Transaction ID for reference. · Powered by Razorpay'}
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © Sri Venkateshwara Co. · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
