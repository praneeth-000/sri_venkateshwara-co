import React from 'react';
import { motion } from 'framer-motion';
import founderImg from '../assets/founder.png';
import cofounderImg from '../assets/cofounder.png';

const Leadership = () => {
  const leaders = [
    {
      name: "Amar Nadh Muriki",
      role: "Founder & Motor Specialist",
      experience: "35+ Years Experience",
      image: founderImg,
      desc: "Amar Nadh Muriki is a highly experienced motor specialist with over 35 years of hands-on expertise. Trained directly by the Taro Company, he has deep knowledge in selecting the right motors for agricultural and domestic needs. His guidance helps customers choose efficient and long-lasting solutions."
    },
    {
      name: "Poornima Muriki",
      role: "Co-Founder & Operations Head",
      experience: "10+ Years Experience",
      image: cofounderImg,
      desc: "Poornima Muriki manages daily operations and customer service with over 10 years of experience. She ensures smooth shop functioning, proper stock handling, and excellent customer satisfaction, playing a key role in business growth."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">
            Our Leadership
          </h2>

          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Experienced Leadership Since 1975
          </h3>

          <p className="text-gray-600 max-w-xl mx-auto">
            Meet the people behind Sri Venkateshwara & Co, delivering trust and service for generations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              {/* Image */}
              <div className="w-48 h-48 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Experience */}
              <span className="inline-block mb-3 px-4 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                {leader.experience}
              </span>

              {/* Name */}
              <h4 className="text-xl font-bold text-gray-900">
                {leader.name}
              </h4>

              {/* Role */}
              <p className="text-green-600 font-semibold text-sm mb-3">
                {leader.role}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {leader.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Leadership;