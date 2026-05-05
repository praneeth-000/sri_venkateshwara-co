import React from "react";
import { motion } from "framer-motion";

const Offers = () => {
  return (
    <section id="offers" className="py-20 bg-green-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 font-bold text-sm mb-4">
              Seasonal Offer Focus
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Get 20% Off on <br/>
              <span className="text-green-600">Complete Plumbing Sets</span>
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Planning to start a new construction? Bring us your blueprint and get an instant unmatchable estimate. Additional 5% discount on bulk purchases.
            </p>
            <div className="flex gap-4">
              <a href="#offers" className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                Avail Offer
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="md:w-1/2 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center transform translate-y-8">
              <div className="text-4xl font-bold text-green-600 mb-2">15%</div>
              <div className="text-center font-semibold text-gray-700">Off on Finolex Cables</div>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center">
              <div className="text-4xl font-bold mb-2">₹1000</div>
              <div className="text-center font-semibold text-green-100">Cashback on Pumps</div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Offers;
