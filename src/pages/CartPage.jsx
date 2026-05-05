import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Helper to parse price string "₹8500" into number 8500
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  // Calculate total: sum of product prices * quantities
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parsePrice(item.price);
    const qty = item.quantity || 1;
    return total + itemPrice * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <FaShoppingCart className="mr-3 text-green-600" /> My Cart
          </h1>
          <Link
            to="/grab-it"
            className="text-green-600 hover:text-green-700 font-medium flex items-center transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
            <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
            <Link
              to="/grab-it"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Shop Grab It Deals
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-sm sm:rounded-xl border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center">
                  
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden sm:mr-6 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          High quality electrical and hardware supplies matching industry standards.
                        </p>
                      </div>
                      <p className="text-lg font-bold text-green-600 whitespace-nowrap ml-4">
                        {item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity display / adjuster */}
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => {
                            const current = parseInt(item.quantity) || 1;
                            if (current > 1) updateQuantity(item.id, current - 1);
                          }}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity === undefined ? 1 : item.quantity}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              updateQuantity(item.id, '');
                            } else {
                              const num = parseInt(val, 10);
                              updateQuantity(item.id, num);
                            }
                          }}
                          onBlur={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (isNaN(val) || val < 1) {
                              updateQuantity(item.id, 1);
                            }
                          }}
                          className="w-16 text-center py-1 text-gray-900 font-medium border-l border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 hide-arrows"
                        />
                        <button 
                          onClick={() => {
                            const current = parseInt(item.quantity) || 1;
                            updateQuantity(item.id, current + 1);
                          }}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove action */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center transition-colors"
                      >
                        <FaTrash className="mr-1.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Total Section */}
            <div className="bg-gray-50 px-4 py-6 sm:px-6 border-t border-gray-200">
              <div className="flex justify-between text-lg font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p className="font-bold text-green-700">₹{totalPrice.toLocaleString('en-IN')}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">Taxes and shipping calculated at checkout.</p>
              <div className="mt-6">
                <button
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;
