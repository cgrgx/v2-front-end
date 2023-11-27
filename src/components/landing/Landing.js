import React from "react";

import Header from "./ui/header";
import Main from "./ui/main";
import HeroSection from "./ui/hero";
import FeaturesSection from "./ui/features";
import ZigzagSection from "./ui/zigzag";
import Footer from "./ui/footer";

// ... import other sections

function Landing() {
  return (
    <div>
      <Header />
      <Main>
        <HeroSection />
        <FeaturesSection />
        <ZigzagSection />
        {/* <TestimonialsSection /> */}
        {/* Include other sections as needed */}
      </Main>
      <Footer />
    </div>
  );
}

export default Landing;
