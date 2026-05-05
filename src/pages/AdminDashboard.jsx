import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
  FaSignOutAlt, FaBox, FaShoppingCart, FaLock, FaUnlock,
  FaEye, FaEyeSlash, FaCalendarAlt, FaUser, FaMapMarkerAlt,
  FaReceipt, FaCheckCircle, FaTimesCircle, FaSearch, FaSort
} from 'react-icons/fa';

// ─── Secret Key Gate Modal ────────────────────────────────────────────────────
const SecretKeyGate = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const CORRECT_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_KEY) {
      onUnlock();
    } else {
      setError('Incorrect secret key. Access denied.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 ${shake ? 'animate-shake' : ''}`}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <FaLock className="text-3xl text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Owner Access Required</h2>
          <p className="text-sm text-gray-500 text-center mt-1">Enter the secret passphrase to view all orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              id="admin-secret-input"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(''); }}
              placeholder="Secret passphrase"
              autoFocus
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-colors font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showKey ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium text-center bg-red-50 py-2 px-3 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            id="admin-unlock-btn"
            className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaUnlock /> Unlock Orders
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Orders Table ─────────────────────────────────────────────────────────────
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('svshop_orders') || '[]');
      setOrders(stored);
    } catch {
      setOrders([]);
    }
  }, []);

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const filtered = orders
    .filter((o) => {
      const q = search.toLowerCase();
      return (
        (o.id || '').toLowerCase().includes(q) ||
        (o.customer?.fullName || '').toLowerCase().includes(q) ||
        (o.customer?.phone || '').includes(q)
      );
    })
    .sort((a, b) =>
      sortNewest
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FaShoppingCart className="text-5xl mb-4 opacity-30" />
        <p className="text-lg font-semibold">No orders yet</p>
        <p className="text-sm">Orders placed by customers will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            id="order-search"
            placeholder="Search by name, order ID, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <button
          onClick={() => setSortNewest((s) => !s)}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 whitespace-nowrap"
        >
          <FaSort /> {sortNewest ? 'Newest First' : 'Oldest First'}
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-extrabold text-green-700">{orders.length}</p>
          <p className="text-xs text-green-600 font-medium">Total Orders</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-extrabold text-blue-700">
            ₹{orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-blue-600 font-medium">Total Revenue</p>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-yellow-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-extrabold text-yellow-700">
            {orders.filter((o) => o.paymentStatus === 'PAID').length}
          </p>
          <p className="text-xs text-yellow-600 font-medium">Paid Orders</p>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {['Date', 'Order ID', 'Customer', 'Address', 'Items', 'Amount', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {filtered.map((order, idx) => (
              <tr key={order.id || idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(order.timestamp)}
                </td>
                <td className="px-4 py-4">
                  <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                    {order.id || '—'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold text-gray-900">{order.customer?.fullName || '—'}</p>
                  <p className="text-xs text-gray-500">{order.customer?.phone || ''}</p>
                </td>
                <td className="px-4 py-4 max-w-[160px]">
                  <p className="text-xs text-gray-600 line-clamp-2">{order.customer?.address || '—'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">PIN: {order.customer?.pincode || ''}</p>
                </td>
                <td className="px-4 py-4 max-w-[180px]">
                  <ul className="space-y-0.5">
                    {(order.items || []).map((item, i) => (
                      <li key={i} className="text-xs text-gray-600 truncate">
                        · {item.name} ×{item.quantity || 1}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{(order.total || 0).toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {order.paymentStatus === 'PAID' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      <FaCheckCircle /> PAID
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                      <FaTimesCircle /> COD
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">No orders match your search.</div>
        )}
      </div>

      {/* ── Mobile Cards ── */}
      <div className="lg:hidden space-y-4">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No orders match your search.</p>
        )}
        {filtered.map((order, idx) => (
          <div key={order.id || idx} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
              <span className="font-mono text-xs bg-white text-gray-600 px-2 py-1 rounded-lg border border-gray-200">
                {order.id || '—'}
              </span>
              {order.paymentStatus === 'PAID' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  <FaCheckCircle /> PAID
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                  <FaTimesCircle /> COD
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="px-4 py-3 space-y-2.5">
              <div className="flex items-start gap-2">
                <FaCalendarAlt className="text-gray-400 mt-0.5 text-xs flex-shrink-0" />
                <span className="text-xs text-gray-500">{formatDate(order.timestamp)}</span>
              </div>
              <div className="flex items-start gap-2">
                <FaUser className="text-gray-400 mt-0.5 text-xs flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{order.customer?.fullName || '—'}</p>
                  <p className="text-xs text-gray-500">{order.customer?.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gray-400 mt-0.5 text-xs flex-shrink-0" />
                <p className="text-xs text-gray-600">{order.customer?.address}, {order.customer?.pincode}</p>
              </div>
              <div className="flex items-start gap-2">
                <FaBox className="text-gray-400 mt-0.5 text-xs flex-shrink-0" />
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {(order.items || []).map((item, i) => (
                    <li key={i}>· {item.name} ×{item.quantity || 1}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">Total Amount</span>
                <span className="text-base font-extrabold text-green-600">
                  ₹{(order.total || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [ordersUnlocked, setOrdersUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleOrdersTabClick = () => {
    if (ordersUnlocked) {
      setActiveTab('orders');
    } else {
      setShowGate(true);
    }
  };

  const handleUnlock = () => {
    setOrdersUnlocked(true);
    setShowGate(false);
    setActiveTab('orders');
  };

  const sampleProducts = [
    { id: 1, name: 'Taro Pump Motor', price: '₹8,500', stock: 12, category: 'Pumps' },
    { id: 2, name: 'Crompton Ceiling Fan', price: '₹2,500', stock: 45, category: 'Fans' },
    { id: 3, name: 'Finolex Pipes (1m)', price: '₹1,200', stock: 120, category: 'Plumbing' },
    { id: 4, name: 'Anchor Roma Switches', price: '₹500', stock: 300, category: 'Electrical' },
    { id: 5, name: 'Ashirvad CPVC Fittings', price: '₹900', stock: 85, category: 'Plumbing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      {showGate && <SecretKeyGate onUnlock={handleUnlock} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative z-10 bg-white rounded-2xl shadow-sm px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-l-4 border-green-600">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Sri Venkateshwara Co. — Owner Panel</p>
          </div>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="self-start sm:self-auto inline-flex items-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            <FaSignOutAlt className="mr-2 text-gray-400" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
          <button
            id="tab-products"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'products'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <FaBox /> Products
          </button>
          <button
            id="tab-orders"
            onClick={handleOrdersTabClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'orders'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <FaReceipt />
            Orders
            {!ordersUnlocked && <FaLock className="text-xs opacity-60" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaBox className="text-green-600" /> Products Overview
                </h2>
              </div>

              {/* Desktop products table */}
              <div className="hidden sm:block overflow-hidden rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {sampleProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-400">{p.id}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{p.name}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-green-50 text-green-700 font-medium px-2 py-1 rounded-full">{p.category}</span>
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">{p.price}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock > 50 ? 'bg-green-100 text-green-700' : p.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {p.stock} units
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile product cards */}
              <div className="sm:hidden space-y-3">
                {sampleProducts.map((p) => (
                  <div key={p.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.category} · {p.stock} units</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && ordersUnlocked && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <FaReceipt className="text-green-600" />
                <h2 className="text-lg font-bold text-gray-900">Customer Orders</h2>
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <FaUnlock className="text-[10px]" /> Unlocked
                </span>
              </div>
              <OrdersTab />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
