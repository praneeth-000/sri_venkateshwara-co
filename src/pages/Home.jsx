import React from 'react';
import Hero from '../components/Hero';
import TaroPumps from '../components/TaroPumps';
import WhyChooseUs from '../components/WhyChooseUs';
import Brands from '../components/Brands';
import Offers from '../components/Offers';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div className="pt-24">
      <Hero />
      <div className="mt-8">
        {/* Placed motor block instantly underneath Hero logic per client request */}
        <TaroPumps />
      </div>
      <WhyChooseUs />
      <Brands />
      <Offers />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;
