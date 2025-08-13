import React from "react";

const Footer = ({ links, copyright }) => {
  return (
    <footer className="bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8">
          {links?.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-gray-400 hover:text-orange-400 transition-colors text-sm sm:text-base"
            >
              {item?.label}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-xs sm:text-sm px-2">{copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
