import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiCheckCircle, FiZoomIn } from "react-icons/fi";

import taroPumpImg from '../assets/motor.png';
import motorInsideImg from '../assets/motor-inside.png';
import image1 from '../assets/image1.png';
import image2 from '../assets/pic1.png';
import image3 from '../assets/image3.png';

const TaroPumps = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(motorInsideImg);
  const galleryImages = [motorInsideImg, image1, image2, image3];

  // Lock scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Positioning the labels for the internal motor view modal
  const labels = [
    { id: 1, title: "Copper Winding", desc: "For superior conductivity and life", top: "25%", left: "15%", delay: 0.2 },
    { id: 2, title: "High Efficiency Performance", desc: "Max water flow with minimum power", top: "50%", left: "65%", delay: 0.4 },
    { id: 3, title: "Durable Outer Body", desc: "Rust-proof and built for tough conditions", top: "75%", left: "20%", delay: 0.6 },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex flex-col items-start text-left"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-green-100 text-green-800 font-bold text-sm mb-6 tracking-wide shadow-sm border border-green-200">
            Authorized Dealer of Taro Pumps from Texmo Industries
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Powering Agriculture with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Taro Pumps</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            High-performance borewell motors for efficient irrigation and long-lasting durability. Built tough to last generations.
          </p>
          
          <motion.a
            href="https://wa.me/919394423366"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaWhatsapp className="text-2xl" />
            Enquire on WhatsApp
          </motion.a>
        </motion.div>

        {/* Right Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative w-full flex justify-center py-10"
        >
          {/* Soft green glow behind pump */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-green-400 to-green-300 rounded-full blur-3xl opacity-30 z-0"></div>
          
          {/* Water Flow Animation Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg h-32 overflow-hidden z-0 opacity-80" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent)' }}>
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              className="w-[200%] h-full flex items-end"
            >
              {[1, 2].map((i) => (
                <svg key={i} className="w-1/2 h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path 
                    d="M0,0 C300,60 300,-60 600,0 C900,60 900,-60 1200,0 L1200,120 L0,120 Z" 
                    fill="url(#waterGrad1)" 
                    className="opacity-40"
                  />
                  <path 
                    d="M0,30 C300,-30 300,90 600,30 C900,-30 900,90 1200,30 L1200,120 L0,120 Z" 
                    fill="url(#waterGrad2)" 
                    className="opacity-50"
                  />
                  <defs>
                    <linearGradient id="waterGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="waterGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="relative z-10 w-full max-w-md cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            {/* Glowing Badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-6 -right-4 md:-right-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_10px_30px_rgba(16,_185,-129,_0.3)] border border-green-100 z-20 flex flex-col gap-1 items-start transform rotate-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">High Efficiency Motor</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute top-1/2 -left-4 md:-left-12 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_10px_30px_rgba(59,_130,-246,_0.2)] border border-blue-50 z-20 flex flex-col gap-1 items-start transform -rotate-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Energy Saving</span>
              </div>
            </motion.div>

            <motion.div className="relative">
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center rounded-xl">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full text-green-600 transform scale-0 group-hover:scale-100 transition-transform shadow-lg">
                  <FiZoomIn className="text-3xl" />
                </div>
              </div>

              {/* Exact user requirements: rounded-xl, shadow-lg, scale-105 hover transition */}
              <img 
                src={taroPumpImg} 
                alt="Taro Agriculture Pump" 
                className="w-full h-auto object-contain rounded-xl shadow-[0_10px_30px_rgba(0,_0,_0,_0.1)] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(22,_163,_74,_0.3)] bg-white/50 backdrop-blur-sm"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-lg transition-all"
              >
                <FiX className="text-2xl" />
              </button>

              <div className="flex flex-col md:flex-row h-[85vh] md:h-[650px]">
                {/* Left Side: Interactive Diagram & Gallery */}
                <div className="w-full md:w-3/5 bg-gray-50 relative h-[450px] md:h-full p-4 md:p-8 flex flex-col items-center justify-center">
                  
                  {/* The exact internal motor cut-section graphic requested */}
                  <div className="relative w-full max-w-sm md:max-w-md flex-grow flex items-center justify-center bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        src={activeImage} 
                        alt="Motor Detail" 
                        className="w-full max-h-[250px] md:max-h-[350px] object-contain drop-shadow-sm"
                      />
                    </AnimatePresence>

                    {/* Animated Pointers */}
                    {activeImage === motorInsideImg && labels.map((label) => (
                      <motion.div
                        key={label.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: label.delay, type: "spring" }}
                        className="absolute hidden md:flex items-center gap-2"
                        style={{ top: label.top, left: label.left }}
                      >
                        <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse border-2 border-white shadow-md"></div>
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-gray-800 whitespace-nowrap border border-gray-100">
                          {label.title}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Image Thumbnails Gallery */}
                  <div className="flex items-center justify-center gap-3 mt-4 md:mt-8">
                    {galleryImages.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgSrc)}
                        className={`w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white p-1 transition-all duration-300 pointer-events-auto border-2 flex items-center justify-center ${
                          activeImage === imgSrc ? 'border-green-500 shadow-md scale-105' : 'border-transparent hover:border-gray-300 hover:scale-105 shadow-sm'
                        }`}
                      >
                        <img src={imgSrc} alt={`Gallery Thumb ${idx}`} className="max-w-full max-h-full object-contain" />
                      </button>
                    ))}
                  </div>

                </div>

                {/* Right Side: Details List */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white border-l border-gray-100">
                  <span className="text-green-600 font-bold uppercase tracking-wider text-sm mb-2">Technical Excellence</span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Inside the Motor</h3>
                  
                  <div className="space-y-8">
                    {labels.map((label, idx) => (
                      <motion.div 
                        key={label.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 bg-green-100 rounded-full p-1.5 text-green-600 flex-shrink-0 shadow-sm">
                          <FiCheckCircle className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{label.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{label.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                  >
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold shadow-md hover:shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
                    >
                      Close Details
                    </button>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TaroPumps;
