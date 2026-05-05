import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  FaLock, FaSignOutAlt, FaReceipt, FaSearch, FaSort,
  FaCheckCircle, FaTimesCircle, FaUser, FaMapMarkerAlt,
  FaBox, FaCalendarAlt, FaEye, FaEyeSlash, FaShoppingCart
} from 'react-icons/fa';

// ── Access control — only this email can view the dashboard ──────────────────
const ALLOWED_EMAIL = 'amar53216@gmail.com';

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};


// ── Login Box ─────────────────────────────────────────────────────────────────
const LoginBox = ({ accessError }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged in the parent (AdminPage) detects success
      // and switches to the dashboard automatically.
    } catch (err) {
      // ── Verbose logging so you can read the exact code in DevTools ──
      console.log('=== Firebase Auth Error ===');
      console.log('code   :', err.code);
      console.log('message:', err.message);
      console.log('full   :', err);

      const code = err.code || '';
      let msg = `Something went wrong. (${code || 'unknown'})`;
      if (
        code.includes('user-not-found') ||
        code.includes('wrong-password') ||
        code.includes('invalid-credential') ||
        code.includes('invalid-email')
      ) {
        msg = 'Invalid email or password. Check your credentials.';
      } else if (code.includes('too-many-requests')) {
        msg = 'Too many attempts. Please wait a moment and try again.';
      } else if (code.includes('network-request-failed')) {
        msg = 'Network error. Check your internet connection.';
      } else if (code.includes('operation-not-allowed')) {
        msg = 'Email/password sign-in is not enabled in Firebase Console.';
      } else if (code.includes('user-disabled')) {
        msg = 'This account has been disabled.';
      }
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl shadow-lg mb-4">
            <FaLock className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Sri Venkateshwara Co. — Owner Access</p>
        </div>

        {/* Card */}
        <div className={`bg-white rounded-3xl shadow-2xl p-8 ${shake ? 'animate-shake' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="amar53216@gmail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-2.5 rounded-xl text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <FaLock className="text-green-200 text-sm" /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-5">
            Authorized personnel only · Sri Venkateshwara & Co.
          </p>

          {/* Access-denied banner (shown when a non-whitelisted user tries) */}
          {accessError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-2.5 rounded-xl text-center">
              🚫 {accessError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Orders Dashboard ──────────────────────────────────────────────────────────
const OrdersDashboard = ({ onLogout }) => {
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ _docId: doc.id, ...doc.data() }));
        setOrders(data);
      } catch (err) {
        console.error('Firestore fetch error:', err);
        // Fallback: read from localStorage if Firestore isn't configured yet
        try {
          const local = JSON.parse(localStorage.getItem('svshop_orders') || '[]');
          setOrders(local);
          if (local.length > 0) setError('⚠ Showing local orders — Firestore not reachable.');
          else setError('Could not fetch orders from Firestore. Check your Firebase config.');
        } catch {
          setError('Could not fetch orders.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const paidCount    = orders.filter((o) => o.paymentStatus === 'PAID').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-12" style={{ paddingTop: '100px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative z-10 bg-white rounded-2xl shadow-sm px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-l-4 border-green-600">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Orders Dashboard</h1>
            <p className="text-sm text-gray-500">Sri Venkateshwara Co. — All customer orders</p>
          </div>
          <button
            id="admin-logout-btn"
            onClick={onLogout}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center border border-gray-100">
            <p className="text-3xl font-extrabold text-green-700">{orders.length}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Orders</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center border border-gray-100">
            <p className="text-3xl font-extrabold text-blue-700">₹{totalRevenue.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Revenue</p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl shadow-sm p-4 text-center border border-gray-100">
            <p className="text-3xl font-extrabold text-yellow-600">{paidCount}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Paid Orders</p>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              id="order-search"
              type="text"
              placeholder="Search by name, order ID or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
            />
          </div>
          <button
            onClick={() => setSortNewest((s) => !s)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white hover:bg-gray-50 whitespace-nowrap"
          >
            <FaSort /> {sortNewest ? 'Newest First' : 'Oldest First'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
              <p className="text-sm text-gray-500">Fetching orders from Firestore...</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && orders.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <FaShoppingCart className="text-5xl mb-4 opacity-30" />
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="text-sm">Orders placed by customers will appear here.</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <>
            {/* ── Orders Table ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Date', 'Order ID', 'Customer', 'Address', 'Items Purchased', 'Amount', 'Method', 'Payment Status'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {filtered.map((order, idx) => (
                      <tr key={order._docId || order.id || idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(order.timestamp)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg whitespace-nowrap">
                            {order.id || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{order.customer?.fullName || '—'}</p>
                          <p className="text-xs text-gray-400">{order.customer?.phone || ''}</p>
                        </td>
                        <td className="px-4 py-4 max-w-[180px]">
                          <p className="text-xs text-gray-600 line-clamp-2">{order.customer?.address || '—'}</p>
                          <p className="text-xs text-gray-400 mt-0.5">PIN: {order.customer?.pincode || ''}</p>
                        </td>
                        <td className="px-4 py-4 max-w-[200px]">
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
                        {/* Payment Method */}
                        <td className="px-4 py-4">
                          {order.paymentMethod === 'COD' || order.paymentStatus === 'COD' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 whitespace-nowrap">
                              💵 COD
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 whitespace-nowrap">
                              💳 Online
                            </span>
                          )}
                        </td>
                        {/* Payment Status */}
                        <td className="px-4 py-4">
                          {order.paymentStatus === 'PAID' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 whitespace-nowrap">
                              <FaCheckCircle /> PAID
                            </span>
                          ) : order.paymentStatus === 'COD' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 whitespace-nowrap">
                              <FaTimesCircle /> COD
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 whitespace-nowrap">
                              <FaTimesCircle /> PENDING
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <p className="text-center py-10 text-gray-400 text-sm">No orders match your search.</p>
                )}
              </div>
            </div>

          </>
        )}

      </div>
    </div>
  );
};

// ── Main Export — Auth state drives login vs dashboard ───────────────────────
const AdminPage = () => {
  // null = still checking, false = not logged in, true = logged in & authorised
  const [authState, setAuthState] = useState(null);
  const [accessError, setAccessError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState(false);
        setAccessError('');
        return;
      }

      // Email whitelist check
      if (user.email !== ALLOWED_EMAIL) {
        setAccessError(`Access denied. ${user.email} is not authorised.`);
        await signOut(auth);
        setAuthState(false);
        return;
      }

      setAccessError('');
      setAuthState(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(auth);

  // Still resolving Firebase session — show a neutral loading screen
  if (authState === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          <p className="text-gray-400 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (authState === true) {
    return <OrdersDashboard onLogout={handleLogout} />;
  }

  // authState === false — show login form, passing optional access error
  return <LoginBox accessError={accessError} />;
};

export default AdminPage;
