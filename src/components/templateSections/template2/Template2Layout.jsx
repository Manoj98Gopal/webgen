import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Services from "./Services";
import About from "./About";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const Template2Layout = ({ webData }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar {...webData?.navbar} />
      <HeroSection {...webData?.hero} />
      <Services {...webData?.services} />
      <About {...webData?.about} />
      <Gallery {...webData?.gallery} />
      <Testimonials {...webData?.testimonials} />
      <ContactUs {...webData?.contact} />
      <Footer {...webData?.footer} links={webData?.navbar?.links} />
    </div>
  );
};

export default Template2Layout;
