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

const EditTemplateHeader = ({ handleSectionSelect }) => {
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
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Template</h1>
        <div className="flex items-center gap-2">
          {/* Tertiary action */}
          <Button variant="secondary">Change template</Button>

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

          {/* Primary action */}
          <Button>Publish</Button>
        </div>
      </div>
    </div>
  );
};

export default EditTemplateHeader;
