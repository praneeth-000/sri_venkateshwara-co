import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiShield, FiHeart } from 'react-icons/fi';

const features = [
  {
    icon: <FiAward className="text-3xl text-green-600" />,
    title: "50+ Years Legacy",
    description: "Serving customers since 1975 with trusted quality.",
  },
  {
    icon: <FiUsers className="text-3xl text-green-600" />,
    title: "Expert Guidance",
    description: "Get accurate product suggestions from experienced professionals.",
  },
  {
    icon: <FiShield className="text-3xl text-green-600" />,
    title: "Authorized Dealer",
    description: "Official dealer of Taro Pumps and trusted brands.",
  },
  {
    icon: <FiHeart className="text-3xl text-green-600" />,
    title: "Customer First",
    description: "We focus on customer satisfaction and long-term trust.",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background soft accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2"
          >
            Our Core Values
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight"
          >
            Why Customers Trust Us
          </motion.h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                {/* Clone icon to dynamically swap colors securely on hovering wrapper logic */}
                {React.cloneElement(feature.icon, { 
                  className: "text-3xl text-green-600 group-hover:text-white transition-colors duration-300" 
                })}
              </div>
              <h4 className="text-xl font-bold font-poppins text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed font-sans">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
