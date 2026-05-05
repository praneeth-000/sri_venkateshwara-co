import React, { useState } from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

const GrabItSection = () => {
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState({});

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
    // Add to local state
    setCart((prevCart) => [...prevCart, product]);
    
    // Temporarily show "Added to cart"
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="text-green-600">Grab It</span> Deals
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Top electricals and plumbing essentials specially picked for you.
          </p>
        </div>

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
                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                      addedItems[product.id]
                        ? 'bg-green-100 text-green-800 border-green-200 focus:ring-green-500'
                        : 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    }`}
                  >
                    {addedItems[product.id] ? (
                      <>
                        <FaCheck className="mr-2" /> Added to cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="mr-2" /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional simple floating cart indicator for local state to prove cart state is keeping track */}
        {cart.length > 0 && (
          <div className="fixed bottom-24 right-6 bg-white border-2 border-green-600 shadow-xl rounded-full px-6 py-3 flex items-center space-x-2 z-50 animate-bounce">
            <FaShoppingCart className="text-green-600 text-xl" />
            <span className="font-bold text-gray-900">{cart.length} item(s)</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default GrabItSection;
