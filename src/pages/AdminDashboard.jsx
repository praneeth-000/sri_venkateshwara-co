import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaPlus, FaSignOutAlt, FaBox } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  // Sample placeholder products as per requirement
  const sampleProducts = [
    { id: 1, name: 'Taro Pump Motor', price: '₹8500', stock: 12 },
    { id: 2, name: 'Crompton Ceiling Fan', price: '₹2500', stock: 45 },
    { id: 3, name: 'Finolex Pipes', price: '₹1200', stock: 120 },
    { id: 4, name: 'Anchor Roma Switches', price: '₹500', stock: 300 },
    { id: 5, name: 'Ashirvad CPVC Fittings', price: '₹900', stock: 85 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow px-5 py-4 sm:px-6 flex justify-between items-center mb-8 border-l-4 border-green-600">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your store products and inventory.</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2 text-gray-400" />
            Logout
          </button>
        </div>

        {/* Action Controls */}
        <div className="mb-6">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
            <FaPlus className="mr-2" />
            Add Product
          </button>
        </div>

        {/* Products List Basic */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FaBox className="mr-2 text-green-600" />
              Products Overview
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {sampleProducts.map((product) => (
              <li key={product.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-600 truncate">
                      {product.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Stock: {product.stock} units
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {sampleProducts.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No products found. Click "Add Product" to get started.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
