import { Suspense, lazy } from "react";

import Fullpagespinner from "./ui/fullpagespinner";
import Reveal from "./Reveal";

const Header = lazy(() => import("./ui/header"));
const Main = lazy(() => import("./ui/main"));
const HeroSection = lazy(() => import("./ui/hero"));
const FeaturesSection = lazy(() => import("./ui/features"));
const ZigzagSection = lazy(() => import("./ui/zigzag"));
const Faq = lazy(() => import("./ui/faq"));
const TestimonialsSection = lazy(() => import("./ui/testimonials"));
const Newsletter = lazy(() => import("./ui/newsletter"));
const Footer = lazy(() => import("./ui/footer"));

// import Main from "./ui/main";
// import HeroSection from "./ui/hero";
// import FeaturesSection from "./ui/features";
// import ZigzagSection from "./ui/zigzag";
// import Footer from "./ui/footer";
// import Faq from "./ui/faq";
// import TestimonialsSection from "./ui/testimonials";
// import Newsletter from "./ui/newsletter";

// ... import other sections

function Landing() {
  return (
    <Suspense fallback={<Fullpagespinner />}>
      <Header />
      <Main>
        <Reveal>
          <HeroSection />
        </Reveal>
        <Reveal>
          <FeaturesSection />
        </Reveal>
        <Reveal>
          <ZigzagSection />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        <Reveal>
          <Newsletter />
        </Reveal>
      </Main>
      <Reveal>
        <Footer />
      </Reveal>
    </Suspense>
  );
}

export default Landing;
