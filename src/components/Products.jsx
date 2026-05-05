import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import monoblockImg from '../assets/monoblock.png';
import columnPipesImg from '../assets/column_pipes.png';
import cromptonFanImg from '../assets/vgaurd_fan.png';
import romaImg from '../assets/roma.png';
import ashirvadImg from '../assets/cera.png';
import cromptonLightImg from '../assets/crompton_light.png';

const Products = () => {
  const [filter, setFilter] = useState("All");

  const products = [
    { id: 1, name: "Texmo Single Phase Monoblock", category: "Domestic", image: monoblockImg },
    { id: 2, name: "Ashirvad Column Pipes & cpvc fittings", category: "Agriculture", image: columnPipesImg },
    { id: 3, name: "Vguard anti dust Ceiling Fan  1.2m ", category: "Electrical", image: cromptonFanImg },
    { id: 4, name: "Anchor Roma Switches", category: "Electrical", image: romaImg },
    { id: 5, name: "Cera wall hug toilets ", category: "sanitary", image: ashirvadImg },
    { id: 6, name: "Crompton Lights", category: "Electrical", image: cromptonLightImg },
  ];

  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <section id="products" className="py-24 bg-gray-50 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Our Products</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">Quality Products from Trusted Brands</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-0 bg-white p-1.5 rounded-xl md:rounded-full border border-gray-100 shadow-sm">
            {["All", "Electrical", "Agriculture"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 sm:px-8 py-3 min-h-[44px] rounded-full font-bold transition-all duration-300 ${
                  filter === cat ? "bg-green-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-[200px] object-contain bg-white p-4 border-b border-gray-50" 
                  />
                  <div className="absolute top-4 right-4 bg-green-50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-green-700 shadow-sm uppercase tracking-widest">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1 justify-between bg-white text-center">
                  <h4 className="font-semibold text-gray-800 text-lg mb-6 leading-relaxed">{product.name}</h4>
                  <div className="mt-auto">
                    <a 
                      href={`https://wa.me/919394423366?text=I am interested in knowing more about ${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold flex justify-center items-center gap-2 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <FaWhatsapp className="text-xl" />
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="text-center mt-16">
          <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            View All Catalog
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Products;
