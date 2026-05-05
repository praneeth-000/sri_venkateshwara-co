import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import Chatbot from './Chatbot';

const FloatingLayout = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* WhatsApp Floating Button with custom pulse animation */}
      <motion.a
        href="https://wa.me/919394423366"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-[72px] h-[72px] bg-green-500 text-white rounded-full shadow-[0_10px_30px_rgba(34,_197,_94,_0.6)] cursor-pointer group transition-transform duration-300"
      >
        {/* Pulsing ring */}
        <span className="absolute w-full h-full rounded-full bg-green-400 opacity-75 animate-ping z-0"></span>
        {/* Glow halo */}
        <span className="absolute w-[120%] h-[120%] rounded-full bg-green-500 opacity-40 filter blur-xl z-0 pointer-events-none group-hover:opacity-70 transition-opacity duration-300"></span>
        
        {/* Icon */}
        <FaWhatsapp className="text-[40px] relative z-10 drop-shadow-md" />
      </motion.a>
      
      {/* AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
};

export default FloatingLayout;
