"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./templateSections/Navbar";
import HeroSection from "./templateSections/HeroSection";
import About from "./templateSections/About";
import Services from "./templateSections/Services";
import WhyChooseUs from "./templateSections/WhyChooseUs";
import Gallery from "./templateSections/Gallery";
import Testimonials from "./templateSections/Testimonials";
import ContactUs from "./templateSections/ContactUs";
import Footer from "./templateSections/Footer";
import { useAppContext } from "@/hook/useAppContext";
import { useRouter } from "next/navigation";
import { getFromLocalStore, setToLocalStore } from "./utils";
import EditTemplates from "./EditTemplate/EditTemplates";
import Template2Layout from "./templateSections/template2/Template2Layout";
import { Loader2 } from "lucide-react";

// const webData = {
//   navbar: {
//     show: true,
//     logo: {
//       isImage: false,
//       data: "Spice Garden"
//     },
//     links: [
//       {
//         label: "Home",
//         link: "#hero"
//       },
//       {
//         label: "Menu",
//         link: "#services"
//       },
//       {
//         label: "About",
//         link: "#about"
//       },
//       {
//         label: "Gallery",
//         link: "#gallery"
//       },
//       {
//         label: "Contact",
//         link: "#contact"
//       }
//     ]
//   },
//   hero: {
//     show: true,
//     bgType: "image",
//     bgValue: "",
//     heading: "Spice Garden Restaurant",
//     subheading: "Authentic Indian Cuisine in the Heart of the City",
//     cta1: {
//       label: "View Menu",
//       link: "#services"
//     },
//     cta2: {
//       label: "Book Now",
//       link: "#contact"
//     },
//     heroImage: {
//       id: "asdfadf",
//       url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729510/modern-restaurant-hero_zbmqyy.jpg"
//     },
//     id: "hero"
//   },
//   about: {
//     show: true,
//     heading: "Our Story",
//     description:
//       "Established in 1995, Spice Garden brings you authentic Indian flavors with a modern twist. Our master chefs use traditional recipes passed down through generations, combined with fresh local ingredients to create unforgettable dining experiences.",
//     image: {
//       id: "sadfasfa",
//       url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729508/restaurant-gallery-1_o5jdae.jpg"
//     },
//     highlights: [
//       "25+ Years Experience",
//       "Award-Winning Chefs",
//       "Fresh Daily Ingredients",
//       "Vegetarian & Vegan Options"
//     ],
//     id: "about"
//   },
//   services: {
//     id: "services",
//     show: true,
//     heading: "Our Specialties",
//     initialShowCount: 4, // <-- control how many to show initially
//     items: [
//       {
//         title: "North Indian Classics",
//         description: "Butter chicken, biryani, naan and traditional curries.",
//         image: {
//           id: "dadfsaf",
//           url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/north-indian-food_upbbht.jpg"
//         }
//       },
//       {
//         title: "South Indian Delights",
//         description: "Dosa, idli, sambar and authentic coconut-based dishes.",
//         image: {
//           id: "dasfasfd",
//           url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/south-indian-food_pzed1f.jpg"
//         }
//       },
//       {
//         title: "Street Food Corner",
//         description: "Chaat, pani puri, vada pav and Mumbai street favorites.",
//         image: {
//           id: "dasfasfd",
//           url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/street-food_yefdfa.jpg"
//         }
//       },
//       {
//         title: "Dessert Collection",
//         description: "Gulab jamun, kulfi, ras malai and seasonal sweets.",
//         image: {
//           id: "dafdsadfas",
//           url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729508/indian-desserts_uq9xkz.jpg"
//         }
//       }
//     ],
//     cta: "View Full Menu"
//   },
//   gallery: {
//     id: "gallery",
//     show: true,
//     heading: "Inside Spice Garden",
//     images: [
//       {
//         id: "dafsafd",
//         url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/north-indian-food_upbbht.jpg"
//       },
//       {
//         id: "dsafd",
//         url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/restaurant-gallery-2_fvzfcq.jpg"
//       },
//       {
//         id: "dasdf",
//         url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729508/indian-desserts_uq9xkz.jpg"
//       },
//       {
//         id: "vfuksa",
//         url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/street-food_yefdfa.jpg"
//       },
//       {
//         url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/south-indian-food_pzed1f.jpg",
//         id: "dasfdasf"
//       },
//       {
//         id: "dasfdae",
//         url: "https://res.cloudinary.com/zocials-digital/image/upload/v1754729509/north-indian-food_upbbht.jpg"
//       }
//     ]
//   },
//   testimonials: {
//     id: "testimonials",

//     show: true,
//     heading: "What Our Guests Say",
//     reviews: [
//       {
//         name: "Rajesh Kumar",
//         message:
//           "The best biryani in town! Authentic flavors and great service. Been coming here for 10 years.",
//         rating: 5
//       },
//       {
//         name: "Priya Sharma",
//         message:
//           "Amazing vegetarian options and the staff is so friendly. Perfect for family dinners!",
//         rating: 5
//       },
//       {
//         name: "David Chen",
//         message:
//           "Introduced to Indian cuisine here and absolutely love it. The butter chicken is incredible!",
//         rating: 5
//       }
//     ]
//   },
//   whyChooseUs: {
//     id: "whyChooseUs",
//     show: true,
//     heading: "Why Dine With Us",
//     points: [
//       "Authentic Traditional Recipes",
//       "Fresh Ingredients Daily",
//       "Cozy Family Atmosphere",
//       "Quick Delivery Available",
//       "Private Event Hosting",
//       "Gluten-Free Options"
//     ]
//   },
//   footer: {
//     show: true,
//     links: [
//       {
//         label: "Home",
//         link: "#hero"
//       },
//       {
//         label: "Menu",
//         link: "#services"
//       },
//       {
//         label: "About",
//         link: "#about"
//       },
//       {
//         label: "Gallery",
//         link: "#gallery"
//       },
//       {
//         label: "Contact",
//         link: "#contact"
//       }
//     ],
//     socials: {
//       facebook: "https://facebook.com/spicegardenblr",
//       instagram: "https://instagram.com/spicegardenrestaurant",
//       zomato: "https://zomato.com/spicegarden"
//     },
//     copyright: "© 2025 Spice Garden Restaurant. All rights reserved."
//   },
//   contact: {
//     id: "contact",
//     show: true,
//     heading: "Visit Us Today",
//     address: "123 Food Street, Gandhi Nagar, Bangalore - 560001",
//     phone: "+91 98765 43210",
//     email: "reservations@spicegarden.in",
//     hours: "Daily: 11:00 AM - 11:00 PM",
//     mapEmbedUrl:
//       "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1182.3598770985598!2d76.6125438!3d12.3681545!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7a7be376f0d3%3A0x3a00cc1786dc3682!2sVithamas%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1754723443106!5m2!1sen!2sin"
//   }
// };

const Template1 = ({ webData }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar {...webData?.navbar} />
      <HeroSection {...webData?.hero} />
      <About {...webData?.about} />
      <Services {...webData?.services} />
      <WhyChooseUs {...webData?.whyChooseUs} />
      <Gallery {...webData?.gallery} />
      <Testimonials {...webData?.testimonials} />
      <ContactUs {...webData?.contact} />
      <Footer {...webData?.footer} />
    </div>
  );
};

const templates = {
  template1: { id: "template1", component: Template1 },
  template2: { id: "template2", component: Template2Layout }
};

const DemoTemplate = () => {
  const { commonDetails } = useAppContext();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState("template2");

  const router = useRouter();

  // Get the current template component
  const CurrentTemplate = templates[currentTemplateIndex]?.component;

  const handleChangeTemplate = () => {
    setCurrentTemplateIndex(
      currentTemplateIndex === "template1" ? "template2" : "template1"
    );
  };

  useEffect(() => {
    // 1. If context has webData, save it to localStorage
    if (commonDetails?.webData) {
      setData(commonDetails.webData);
      setToLocalStore("webData", commonDetails.webData);
    } else {
      // 2. Else, try getting it from localStorage
      const storedData = getFromLocalStore("webData");
      if (storedData) {
        setData(storedData);
      } else {
        // 3. If no data in localStorage, redirect
        router.push("/");
      }
    }
  }, [commonDetails]);

  if (!data || !CurrentTemplate) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <EditTemplates
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        webData={data}
        setWebData={setData}
        handleChangeTemplate={handleChangeTemplate}
      >
        <CurrentTemplate webData={data} />
      </EditTemplates>
    </>
  );
};

export default DemoTemplate;
