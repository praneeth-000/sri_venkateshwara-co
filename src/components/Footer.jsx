import React from "react";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-green-900 py-12 text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-start">
            <h3 className="text-white text-xl font-bold mb-2">
              Sri Venkateshwara & Co
            </h3>
            <p className="text-gray-400 italic mb-6">
              "Trusted Since 1975"
            </p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Your premium destination for electrical, agricultural, and sanitary solutions. Dedicated to quality and honest service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:pl-8 lg:pl-16">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium relative">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Categories', href: '/categories' },
                { name: 'Products', href: '/products' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Contact', href: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="inline-block text-gray-300 hover:text-green-400 hover:-translate-y-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Details</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4 group">
                <FiMapPin className="text-green-400 text-lg mt-0.5" />
                <span className="leading-relaxed flex-1 text-gray-300">
                  1/2/36, Main Road, Near Ambedkar Statue, Jammikunta, Telangana - 505122
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <FiPhone className="text-green-400 text-lg" />
                <a 
                  href="tel:9394423366" 
                  className="text-gray-300 hover:text-green-400 transition-all duration-300"
                >
                  9394423366
                </a>
              </li>
            </ul>

            {/* WhatsApp Glow Button */}
            <a 
              href="https://wa.me/919394423366" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_4px_20px_rgba(34,197,94,0.6)] hover:-translate-y-1 w-max"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp Us
            </a>
          </div>
          
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sri Venkateshwara & Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
