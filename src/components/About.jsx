import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiThumbsUp, FiUsers } from "react-icons/fi";
import shopPhoto1 from '../assets/shop_photo1.png';
import shopPhoto2 from '../assets/shop_photo2.png';

const About = () => {
  const features = [
    { icon: <FiAward className="text-3xl text-green-600 group-hover:scale-110 transition-transform" />, title: "50+ Years Experience", desc: "A proud family legacy rooted in the community since 1975." },
    { icon: <FiThumbsUp className="text-3xl text-green-600 group-hover:scale-110 transition-transform" />, title: "Quality Assured", desc: "Only genuine products from top, trusted, world-class brands." },
    { icon: <FiUsers className="text-3xl text-green-600 group-hover:scale-110 transition-transform" />, title: "Customer First", desc: "Dedicated specifically to the needs of local farmers and builders." },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-[100px] opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="relative">
              <img src={shopPhoto1} alt="Sri Venkateshwara Shop" className="w-full h-[260px] object-cover rounded-xl shadow-md" />
              <div className="absolute bottom-0 left-0 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ring-4 ring-green-600/30 z-10 cursor-default">
                50+ Years Experience
              </div>
            </div>
            
            {/* Second Image */}
            <img src={shopPhoto2} alt="Store Interior Setup" className="w-full h-[260px] object-cover rounded-xl shadow-md" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col w-full max-w-xl"
        >
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-8 h-px bg-green-600"></span>
            Established in 1975
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Building Trust Generation by Generation.
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-5 leading-relaxed tracking-normal">
            Established over 50 years ago, Sri Venkateshwara & Co began with a grandfather's vision to support local farmers and households with reliable supplies. Today, we continue that legacy with the same commitment to honesty, quality, and service.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed tracking-normal">
            Whether you are looking for household electrical fittings, industrial components, or heavy-duty agricultural motors and pipes, we are a one-stop destination you can rely on completely.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start group">
                <div className="bg-green-50 p-4 rounded-2xl mb-5 group-hover:bg-green-100 transition-colors shadow-sm">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 truncate w-full">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
export default About;
