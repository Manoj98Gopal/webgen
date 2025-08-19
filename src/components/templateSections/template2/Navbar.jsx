"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger & close icons

const Navbar = ({ logo, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-3xl font-black text-gray-900 tracking-tight">
            {logo?.data?.split(" ")?.map((word, index) => (
              <span
                key={index}
                className={index === 0 ? "text-orange-500" : ""}
              >
                {word}
                {index < logo?.data?.split(" ")?.length - 1 ? " " : ""}
              </span>
            ))}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12">
            {links?.map((link, index) => (
              <a
                key={index}
                href={link?.link}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {link?.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-900 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            {links?.map((link, index) => (
              <a
                key={index}
                href={link?.link}
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)} // close menu on click
              >
                {link?.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
