import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 z-10 opacity-90"></div>
        {/* Subtle texture overlay for premium feel */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888069512-a162232bb2ed?w=1600&q=80')] bg-cover bg-center opacity-[0.05] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center mt-10">
        
        {/* Main Floating Container */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-2 px-6 rounded-full bg-white text-green-700 font-bold text-sm mb-8 shadow-md border border-green-100 tracking-widest uppercase relative overflow-hidden group">
              <span className="relative z-10">Trusted Since 1975</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
            </span>
          </motion.div>

          {/* Core Title (Left vague intentionally if user wants it changed, but currently using premium typography) */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8 tracking-tight drop-shadow-sm"
          >
            Powering Your <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Agriculture & Dreams</span>
          </motion.h1>

          {/* Explicit User Lines */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col text-xl md:text-2xl text-gray-700 font-bold mb-12 text-center space-y-2"
          >
            <span className="text-gray-900 border-b-2 border-green-200 pb-1 inline-block mx-auto">Authorized Dealer of Taro Pumps</span>
            <span className="text-gray-500 text-lg font-medium">Trusted by Farmers & Builders</span>
          </motion.div>

          {/* Calls To Action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full px-4"
          >
            <a href="#contact" className="px-8 py-3.5 bg-green-600 text-white rounded-full font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center hover:bg-green-700">
              Contact Us
            </a>
            <a href="https://wa.me/919394423366" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white text-green-800 rounded-full font-bold text-lg border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-50">
              <FaWhatsapp className="text-2xl text-green-500" /> WhatsApp Enquiries
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative blurred lighting shapes for premium atmosphere */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      {/* Center glowing halo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-70 pointer-events-none z-0"></div>
    </section>
  );
};

export default Hero;
