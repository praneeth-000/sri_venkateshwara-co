import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Categories", href: "/categories" },
    { name: "Products", href: "/products" },
    { name: "Grab It", href: "/grab-it" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b border-transparent ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-3' : 'bg-white/50 backdrop-blur-sm py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4 relative group">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img src={logoImg} alt="Sri Venkateshwara & Co Logo" className="h-14 w-14 md:h-16 md:w-16 object-contain relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight hidden sm:block font-poppins">
            Sri Venkateshwara <span className="text-green-600">& Co</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <NavLink 
              key={index} 
              to={link.href} 
              className={({ isActive }) => 
                `font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
            <FiShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          <Link 
            to="/contact" 
            className={`px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
              location.pathname === '/contact' ? 'bg-green-700 text-white ring-2 ring-green-300' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 text-3xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 py-6 flex flex-col items-center space-y-6"
        >
          {navLinks.map((link, index) => (
            <NavLink 
              key={index} 
              to={link.href} 
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) => 
                `font-bold text-lg transition-colors ${
                  isActive ? "text-green-600" : "text-gray-800 hover:text-green-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="flex space-x-4 items-center mb-2">
            <Link to="/cart" className="relative p-2 text-gray-800 hover:text-green-600">
              <FiShoppingCart className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors w-3/4 text-center"
          >
            Contact Center
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
