import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiDroplet, FiSettings, FiLifeBuoy } from "react-icons/fi";

import electricalImg from '../assets/electrical.jpg';
import agricultureImg from '../assets/agriculture.jpg';
import taroPumpImg from '../assets/taro-pump.png';
import sanitaryImg from '../assets/sanitary.jpg';

const Categories = () => {
  const categories = [
    {
      title: "Electrical Items",
      image: electricalImg,
      icon: <FiZap className="text-xl text-green-500" />,
      items: ["Switches & Plugs", "LED Lights & Bulbs", "Ceiling Fans", "Wires & Cables"],
      bg: "bg-white",
      borderColor: "border-green-100",
      accent: "bg-green-500"
    },
    {
      title: "Agricultural Items",
      image: agricultureImg,
      icon: <FiDroplet className="text-xl text-green-500" />,
      items: ["Drip Irrigation Tools", "Sprinklers & Fittings", "PVC Pipes", "Farming Accessories"],
      bg: "bg-white",
      borderColor: "border-green-100",
      accent: "bg-green-500"
    },
    {
      title: "Borewell Motors",
      image: taroPumpImg,
      icon: <FiSettings className="text-xl text-green-600 group-hover:rotate-90 transition-transform duration-700" />,
      items: ["Taro Pumps", "Submersible Motors", "Water Pumps", "Motor Starters"],
      bg: "bg-green-50/30",
      borderColor: "border-green-200",
      accent: "bg-green-600",
      highlight: true
    },
    {
      title: "Sanitary Items",
      image: sanitaryImg,
      icon: <FiLifeBuoy className="text-xl text-green-500" />,
      items: ["Wash Basins", "Bathroom Taps", "Plumbing Pipes", "Fittings & Accessories"],
      bg: "bg-white",
      borderColor: "border-green-100",
      accent: "bg-green-500"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative gradient patches */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Our Offerings</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">All-in-One Electrical & Agricultural Store</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide an extensive range of materials for home construction, commercial contracting, and large-scale farming needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`rounded-3xl p-6 border ${cat.borderColor} ${cat.bg} shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Highlight ribbon for Borewell Motors */}
              {cat.highlight && (
                <div className="absolute top-4 right-[-35px] bg-green-600 text-white text-xs font-bold px-10 py-1 rotate-45 shadow-md z-20">
                  PREMIUM
                </div>
              )}

              <div className="relative z-10">
                {/* Image Container with precise styling requested */}
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl shadow-lg bg-gray-100">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 p-2 rounded-full shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    {cat.icon}
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-gray-900 mb-6">{cat.title}</h4>
                <ul className="space-y-4">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium tracking-tight">
                      <div className={`w-2 h-2 rounded-full ${cat.accent} mr-3 shadow-sm`}></div>
                      {item === "Taro Pumps" ? (
                        <span className="font-bold text-green-700">{item}</span>
                      ) : item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Categories;
