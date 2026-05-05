import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-green-50 rounded-full filter blur-[100px] opacity-70"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">Visit Our Store</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We're located in the heart of Jammikunta. Drop by for the best deals on premium electrical and agriculture supplies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-[0_20px_60px_rgba(0,_0,_0,_0.05)] border border-gray-100">
          
          {/* Left Contact Details Panel */}
          <div className="lg:w-2/5 p-10 bg-gradient-to-br from-green-900 to-green-800 text-white flex flex-col justify-between relative overflow-hidden rounded-[2rem] shadow-inner">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-green-700 opacity-60 blur-3xl mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-green-600 opacity-40 blur-3xl mix-blend-screen"></div>
            
            <div className="relative z-10">
              <h4 className="text-4xl font-bold mb-10 tracking-tight">Contact Info</h4>
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                    <FiMapPin className="text-2xl text-green-300" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2 text-white">Our Location</h5>
                    <p className="text-green-100/80 leading-relaxed font-medium">
                      1/2/36, Main Road,<br/>
                      Near Ambedkar Statue,<br/>
                      Jammikunta - 505122,<br/>
                      Telangana, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                    <FiPhone className="text-2xl text-green-300" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2 text-white">Phone & WhatsApp</h5>
                    <p className="text-green-100/80 font-bold text-lg mb-1">+91 93944 23366</p>
                    <a href="https://wa.me/919394423366" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm bg-white hover:bg-gray-50 text-green-800 px-4 py-2 rounded-full mt-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <FaWhatsapp className="text-green-600 text-base" /> Message Us
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                    <FiMail className="text-2xl text-green-300" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2 text-white">Email Address</h5>
                    <p className="text-green-100/80 font-medium">amar53216@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                    <FiClock className="text-2xl text-green-300" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2 text-white">Business Hours</h5>
                    <p className="text-green-100/80 font-medium">Mon - Sat: 9:00 AM - 8:30 PM</p>
                    <p className="text-green-100/50 text-sm mt-1">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-green-700/50 text-center">
              <span className="inline-block py-1 px-4 rounded-full border border-green-500/30 text-green-200 text-sm font-bold tracking-widest uppercase shadow-sm">
                Established in 1975
              </span>
              <p className="text-green-100/80 mt-4 font-medium text-lg">50+ Years of Trusted Service</p>
            </div>
          </div>

          {/* Right Map Panel */}
          <div className="lg:w-3/5 p-2 min-h-[450px] lg:h-auto rounded-[2rem] overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 border-[6px] border-white rounded-[2rem] pointer-events-none z-10"></div>
            <iframe 
              title="Sri Venkateshwara & Co Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1894.1584510349487!2d79.4741152!3d18.2871103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a333186f38c320b%3A0x25b1f765abfceff6!2sSri%20Venkateshwara%20%26co%20jammikunta!5e0!3m2!1sen!2sin!4v1774035640933!5m2!1sen!2sin" 
              className="w-full h-full rounded-[1.5rem] filter contrast-110 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ border: 0, minHeight: '450px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
