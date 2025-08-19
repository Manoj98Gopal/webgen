import React from "react";
import { Building2 } from "lucide-react"; // make sure you have lucide-react installed

const Navbar = ({ logo, links, scrollToSection }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-green-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{logo?.data}</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {links?.map((link, index) => (
              <a
                key={index}
                href={link?.link}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-md transition-colors duration-300 hover:bg-gray-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
