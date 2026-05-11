import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCheck, FaBolt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { grabItCategories, grabItProducts } from '../data/products';

const GrabItPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState(grabItCategories[0].id);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/checkout');
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const filteredProducts = grabItProducts.filter(
    (product) => product.categoryId === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-[100px] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            <span className="text-green-600">Grab It</span> Deals
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Exclusive discounts on premium electricals and hardware essentials.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {grabItCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative pt-[100%] bg-white overflow-hidden border-b border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Sale
                </div>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2 h-8">
                    {product.description}
                  </p>
                  <div className="mt-3 flex items-center flex-wrap gap-2">
                    <span className="text-lg font-bold text-green-600">
                      {product.salePrice}
                    </span>
                    <span className="text-sm font-medium text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full flex items-center justify-center px-4 py-2 sm:py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <FaBolt className="mr-2" /> Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center px-4 py-2 sm:py-2.5 border-2 border-green-600 rounded-lg text-sm font-bold text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-medium">No products available in this category yet.</p>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 z-50 flex items-center shadow-lg transition-opacity duration-300">
            <FaCheck className="w-5 h-5 mr-2 text-green-600" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default GrabItPage;
