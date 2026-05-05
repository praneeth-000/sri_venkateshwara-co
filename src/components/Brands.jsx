import React from "react";
import { motion } from "framer-motion";

// Import all local brand assets explicitly to ensure Vite bundler caches them
import anchorLogo from "../assets/brands/Anchor_by_Panasonic.png";
import ashirvadLogo from "../assets/brands/Ashirvad-Logo.png";
import ceraLogo from "../assets/brands/cera.png";
import cromptonLogo from "../assets/brands/Crompton.png";
import finolexLogo from "../assets/brands/finolex.png";
import gmLogo from "../assets/brands/GM_Modular_Logo.png";
import goldmedalLogo from "../assets/brands/Goldmedal.png";
import gypsyGoldLogo from "../assets/brands/gypsy_gold.png";
import havellsLogo from "../assets/brands/Havells.png";
import legrandLogo from "../assets/brands/legrand.png";
import lkLogo from "../assets/brands/lk.png";
import nandiLogo from "../assets/brands/nandi.png";
import orientLogo from "../assets/brands/Orient_Electric.png";
import polycabLogo from "../assets/brands/Polycab.png";
import sintexLogo from "../assets/brands/sintex-logo.png";
import taroLogo from "../assets/brands/taro.png";
import vguardLogo from "../assets/brands/V-Guard-Logo-black.png";

const Brands = () => {
  // Array of local image objects mapped directly
  const brandsArr = [
    { src: taroLogo, alt: "Taro Pumps" },
    { src: anchorLogo, alt: "Anchor by Panasonic" },
    { src: ashirvadLogo, alt: "Ashirvad Pipes" },
    { src: ceraLogo, alt: "Cera" },
    { src: cromptonLogo, alt: "Crompton" },
    { src: finolexLogo, alt: "Finolex" },
    { src: gmLogo, alt: "GM Modular" },
    { src: goldmedalLogo, alt: "Goldmedal" },
    { src: gypsyGoldLogo, alt: "Gypsy Gold" },
    { src: havellsLogo, alt: "Havells" },
    { src: legrandLogo, alt: "Legrand" },
    { src: lkLogo, alt: "LK Logo" },
    { src: nandiLogo, alt: "Nandi Pipes" },
    { src: orientLogo, alt: "Orient Electric" },
    { src: polycabLogo, alt: "Polycab" },
    { src: sintexLogo, alt: "Sintex" },
    { src: vguardLogo, alt: "V-Guard" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-sans">
          Trusted Partners & Brands
        </h2>
      </div>
      
      {/* Infinite Scroll Animation Container */}
      <div className="relative flex w-full overflow-hidden">
        {/* Transparency Fades for slick sliding edges */}
        <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="flex items-center gap-10 whitespace-nowrap pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {/* Double array for seamless loop */}
          {[...brandsArr, ...brandsArr].map((brand, idx) => (
            <div key={idx} className="flex-shrink-0 flex items-center justify-center h-20 w-32 md:w-40 bg-white rounded-xl shadow-sm border border-gray-100/50 p-3 mx-2">
              <img 
                src={brand.src} 
                alt={brand.alt} 
                className="h-12 md:h-14 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;