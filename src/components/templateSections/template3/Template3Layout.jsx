import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import About from "./About";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const Template3Layout = ({ webData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-50">
      <Navbar {...webData?.navbar} />
      <HeroSection {...webData?.hero} />
      <About {...webData?.about} />
      <Services {...webData?.services} />
      <WhyChooseUs {...webData?.whyChooseUs} />
      <Testimonials {...webData?.testimonials} />
      <ContactUs {...webData?.contact} />
      <Footer {...webData?.footer} links={webData?.navbar?.links} />
    </div>
  );
};

export default Template3Layout;
