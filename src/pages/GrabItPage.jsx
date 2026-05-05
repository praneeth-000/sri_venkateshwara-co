import React, { useState } from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const GrabItPage = () => {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const products = [
    {
      id: 1,
      name: 'Taro Pump Motor',
      price: '₹8500',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Crompton Ceiling Fan',
      price: '₹2500',
      image: 'https://images.unsplash.com/photo-1565191845112-9c98a3bdeac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Finolex Pipes',
      price: '₹1200',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      name: 'Anchor Roma Switches',
      price: '₹500',
      image: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      name: 'Ashirvad CPVC Fittings',
      price: '₹900',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            <span className="text-green-600">Grab It</span> Shop
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Discover our premium selection of electricals and plumbing essentials.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 overflow-hidden sm:aspect-none sm:h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover sm:w-full sm:h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 flex-1 h-10">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-bold text-green-600">
                    {product.price}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center px-4 py-3 min-h-[44px] border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
