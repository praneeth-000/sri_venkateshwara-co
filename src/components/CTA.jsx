import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-24 bg-green-600 relative overflow-hidden">
      {/* Background glass patterns */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-white mb-6 tracking-tight leading-tight"
        >
          Need Help Choosing the Right Product?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-green-50 mb-12 font-sans font-light leading-relaxed"
        >
          Our experts are ready to guide you.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <a 
            href="tel:9394423366" 
            className="w-full sm:w-auto px-10 py-5 bg-white text-green-700 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <FaPhoneAlt />
            Call Now
          </a>
          <a 
            href="https://wa.me/919394423366" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent"
          >
            <FaWhatsapp className="text-2xl" />
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
