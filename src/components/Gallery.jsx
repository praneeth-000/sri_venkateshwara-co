import React from "react";
import { motion } from "framer-motion";
import pic9 from "../assets/gallery/pic9.png";
import pic2 from "../assets/gallery/pic2.png";
import pic3 from "../assets/gallery/pic3.png";
import pic4 from "../assets/gallery/pic4.png";
import pic5 from "../assets/gallery/pic5.png";
import pic6 from "../assets/gallery/pic6.png";

const Gallery = () => {
  const images = [
    pic9,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    
  ];

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Our Store</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Gallery & Infrastructure</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Take a look inside our well-stocked Jammikunta store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center justify-center overflow-hidden rounded-xl shadow-sm hover:shadow-md relative group bg-white border border-gray-100 p-2 md:p-6 aspect-[4/3] hover:scale-105 transition-all duration-300"
            >
              <img 
                src={img} 
                alt={`Shop Gallery ${idx + 1}`} 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
