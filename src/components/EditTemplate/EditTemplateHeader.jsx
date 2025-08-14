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

const EditTemplateHeader = ({ onSectionSelect }) => {
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
              {[
                "Navbar",
                "Hero",
                "About",
                "Services",
                "Why Choose Us",
                "Gallery",
                "Testimonials",
                "Contact Us",
                "Footer"
              ].map((section) => (
                <DropdownMenuItem
                  key={section}
                  onClick={() => onSectionSelect?.(section)}
                >
                  {section}
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
