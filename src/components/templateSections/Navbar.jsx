"use client";

import React, { useState } from "react";

const Navbar = ({ logo, links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        {logo?.isImage ? (
          <a href="#hero">
            <img
              src={logo?.data?.url}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </a>
        ) : (
          <a href="#hero">
            <div className="text-2xl font-bold text-orange-400">
              {logo?.data}
            </div>
          </a>
        )}

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {links?.map((item, index) => (
            <a
              key={index}
              href={item?.link}
              className="text-white hover:text-orange-400 transition-colors"
            >
              {item?.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-black/90 backdrop-blur-md rounded-lg px-6 py-4 space-y-3 shadow-lg transition-all">
          {links?.map((item, index) => (
            <a
              key={index}
              href={item?.link}
              className="block text-white hover:text-orange-400 transition-colors"
              onClick={() => setIsMenuOpen(false)} // close menu on click
            >
              {item?.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
