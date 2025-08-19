"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";

const EditTemplateHeader = ({ handleSectionSelect, handleChangeTemplate }) => {
  const sections = [
    { label: "Navbar", value: "navbar" },
    { label: "Hero", value: "hero" },
    { label: "About", value: "about" },
    { label: "Services", value: "services" },
    { label: "Why Choose Us", value: "whyChooseUs" },
    { label: "Gallery", value: "gallery" },
    { label: "Testimonials", value: "testimonials" },
    { label: "Contact Us", value: "contact" },
    { label: "Footer", value: "footer" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-white shadow-lg p-3 flex gap-2 items-end dark:bg-gray-900">
      {/* Dropdown for sections */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Choose Section to Edit</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sections</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sections.map((section) => (
            <DropdownMenuItem
              key={section.value}
              onClick={() => handleSectionSelect(section)}
            >
              {section.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Change Template */}
      <Button variant="secondary" onClick={handleChangeTemplate}>
        Change Template
      </Button>

      {/* Publish */}
      <Button>Publish</Button>
    </div>
  );
};

export default EditTemplateHeader;
