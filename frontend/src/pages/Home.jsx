import React from "react";
import HeroSection       from "../components/sections/HeroSection";
import AboutPreview      from "../components/sections/AboutPreview";
import FeaturedProjects  from "../components/sections/FeaturedProjects";
import SkillsPreview     from "../components/sections/SkillsPreview";
import CTASection        from "../components/sections/CTASection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
      <CTASection />
    </div>
  );
};

export default Home;