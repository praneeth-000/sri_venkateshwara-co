import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const Testimonials = () => {
  const reviews = [
    { name: "Ramesh Kumar", role: "Local Farmer", text: "I bought a Texmo submersible motor from here last year. The guidance provided by the owner was excellent and the product works flawlessly.", stars: 5 },
    { name: "Suresh Builder", role: "Contractor", text: "Sri Venkateshwara & Co is my go-to place for all electrical wiring for my construction projects. Best prices and genuine products.", stars: 5 },
    { name: "Anita Reddy", role: "Home Owner", text: "Very polite staff and they have everything you need for home electricity. Replaced all my fans and lights from their shop.", stars: 4 },
  ];

  return (
    <section className="py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-800 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-green-700 opacity-50 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-green-300 uppercase tracking-widest mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
            >
              <div className="flex text-yellow-400 mb-6 text-xl">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < review.stars ? "fill-current" : "opacity-30"} />
                ))}
              </div>
              <p className="text-green-50 text-lg mb-8 italic leading-relaxed">"{review.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-green-300 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
