import React from 'react';
import Hero from '../components/Home/Hero';
import Information from '../components/Home/Information';
import About from '../components/Home/About';
import Skills from '../components/Home/Skills';
import Achievement from '../components/Home/Achievement';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Information />
      <About />
      <Achievement />
      <Skills />
      {/* Other sections will be added here */}
    </>
  );
};

export default Home;

