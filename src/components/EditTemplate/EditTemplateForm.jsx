"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import ImageUploader from "../ui/inputs/ImageUploader";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Star, Trash2, MapPin, Phone, Mail, Clock } from "lucide-react";

// Utility to update nested object properties using a dot path (e.g., "logo.isImage")
const updateNestedDataFunctional = (data, keyPath, value) => {
  const keys = keyPath.split(".");

  const updateRecursive = (obj, keys, value, index = 0) => {
    if (index === keys.length - 1) {
      return { ...obj, [keys[index]]: value };
    }
    const key = keys[index];
    return {
      ...obj,
      [key]: updateRecursive(obj[key] || {}, keys, value, index + 1)
    };
  };

  return updateRecursive(data, keys, value);
};

const NavSection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler specifically for updating link labels
  const handleLinkLabelChange = (linkIndex, newLabel) => {
    const updatedLinks = [...(formData?.links || [])];
    updatedLinks[linkIndex] = {
      ...updatedLinks[linkIndex],
      label: newLabel
    };
    handleChange("links", updatedLinks);
  };
  return (
    <div className="pt-1 space-y-6">
      {/* Logo Configuration Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">Logo Settings</h3>
        </div>

        {/* Switch for image/text logo */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Logo Type</Label>
            <p className="text-xs text-gray-500">
              Choose between image logo or text-based brand name
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Text</span>
            <Switch
              checked={formData?.logo?.isImage || false}
              onCheckedChange={(checked) =>
                handleChange("logo.isImage", checked)
              }
            />
            <span className="text-xs text-gray-600">Image</span>
          </div>
        </div>

        {/* Logo content */}
        <div className="space-y-2">
          {formData?.logo?.isImage ? (
            <div>
              <Label className="text-sm font-medium block mb-2">
                Upload Logo Image
              </Label>
              <p className="text-xs text-gray-500 mb-3">
                Upload your brand logo (PNG, JPG, SVG recommended)
              </p>
              <ImageUploader
                maxSizeInMB={2}
                multiple={false}
                images={
                  typeof formData?.logo?.data === "object"
                    ? formData?.logo?.data
                    : null
                }
                onImagesChange={(images) => {
                  handleChange("logo.data", images);
                }}
                isEditMode={false}
              />
            </div>
          ) : (
            <div>
              <Label className="text-sm font-medium block mb-2">
                Brand Name
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Enter your business or brand name for text logo
              </p>
              <Input
                placeholder="e.g., Spice Garden, Your Business Name"
                value={
                  typeof formData?.logo?.data === "object"
                    ? ""
                    : formData?.logo?.data || ""
                }
                onChange={(e) => handleChange("logo.data", e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Navigation Menu
          </h3>
        </div>

        <div className="space-y-1 mb-4">
          <Label className="text-sm font-medium">Menu Items</Label>
          <p className="text-xs text-gray-500">
            Customize the display names for your navigation menu. The links will
            remain the same.
          </p>
        </div>

        <div className="space-y-3">
          {(formData?.links || [])?.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-1 bg-white border rounded-md hover:border-gray-300 transition-colors"
            >
              {/* Link target info */}
              <div className="flex flex-col min-w-0 w-32">
                <span className="text-sm font-mono text-gray-700 truncate">
                  {link?.link}
                </span>
              </div>

              {/* Vertical divider */}
              <div className="w-px h-8 bg-gray-200"></div>

              {/* Editable label */}
              <div className="flex-1 min-w-0">
                <Input
                  value={link?.label || ""}
                  onChange={(e) => {
                    handleLinkLabelChange(index, e.target.value);
                  }}
                  placeholder={`Enter display name for ${link?.link?.replace(
                    "#",
                    ""
                  )}`}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> These labels will appear in your navigation
            menu. Keep them short and descriptive (e.g., "Home", "About Us",
            "Services").
          </p>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler for updating CTA button labels
  const handleCtaLabelChange = (buttonKey, newLabel) => {
    const updatedCta = {
      ...formData?.[buttonKey],
      label: newLabel
    };
    handleChange(buttonKey, updatedCta);
  };

  return (
    <div className="pt-1 space-y-6">
      {/* Hero Content Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">Hero Content</h3>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">Main Heading</Label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the primary headline for your hero section
          </p>
          <Input
            placeholder="e.g., Welcome to Our Restaurant"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Subheading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">Subheading</Label>
          <p className="text-xs text-gray-500 mb-2">
            Add a descriptive subtitle or tagline
          </p>
          <Textarea
            placeholder="e.g., Authentic cuisine made with love and fresh ingredients"
            value={formData?.subheading || ""}
            onChange={(e) => handleChange("subheading", e.target.value)}
            className="w-full min-h-[80px]"
            rows={3}
          />
        </div>
      </div>

      {/* Background Settings Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Background Settings
          </h3>
        </div>

        {/* Switch for image/color background */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Background Type</Label>
            <p className="text-xs text-gray-500">
              Choose between image background or solid color
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Color</span>
            <Switch
              checked={formData?.bgType === "image"}
              onCheckedChange={(checked) =>
                handleChange("bgType", checked ? "image" : "color")
              }
            />
            <span className="text-xs text-gray-600">Image</span>
          </div>
        </div>

        {/* Background content */}
        <div className="space-y-2">
          {formData?.bgType === "image" ? (
            <div>
              <Label className="text-sm font-medium block mb-2">
                Upload Background Image
              </Label>
              <p className="text-xs text-gray-500 mb-3">
                Upload a high-quality background image for your hero section
              </p>
              <ImageUploader
                maxSizeInMB={5}
                multiple={false}
                images={
                  typeof formData?.heroImage === "object"
                    ? formData?.heroImage
                    : null
                }
                onImagesChange={(images) => {
                  handleChange("heroImage", images);
                }}
                isEditMode={false}
              />
            </div>
          ) : (
            <div>
              <Label className="text-sm font-medium block mb-2">
                Background Color
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Choose a background color for your hero section
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={formData?.bgValue || "#ffffff"}
                  onChange={(e) => handleChange("bgValue", e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  placeholder="#ffffff"
                  value={formData?.bgValue || ""}
                  onChange={(e) => handleChange("bgValue", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call-to-Action Buttons Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Call-to-Action Buttons
          </h3>
        </div>

        <div className="space-y-1 mb-4">
          <Label className="text-sm font-medium">Button Labels</Label>
          <p className="text-xs text-gray-500">
            Customize the text for your action buttons. You can have 1-2 buttons
            maximum.
          </p>
        </div>

        <div className="space-y-3">
          {/* Primary CTA Button (Required) */}
          <div className="flex items-center gap-3 p-3 bg-white border rounded-md hover:border-gray-300 transition-colors">
            <div className="flex flex-col min-w-0 w-32">
              <span className="text-sm font-mono text-gray-700 truncate">
                {formData?.cta1?.link || "#"}
              </span>
              <span className="text-xs text-gray-500">Primary Button</span>
            </div>

            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex-1 min-w-0">
              <Input
                value={formData?.cta1?.label || ""}
                onChange={(e) => {
                  handleCtaLabelChange("cta1", e.target.value);
                }}
                placeholder="Enter primary button text"
                className="w-full"
              />
            </div>
          </div>

          {/* Secondary CTA Button (Optional) */}
          {formData?.cta2 != null && (
            <div className="flex items-center gap-3 p-3 bg-white border rounded-md hover:border-gray-300 transition-colors">
              <div className="flex flex-col min-w-0 w-32">
                <span className="text-sm font-mono text-gray-700 truncate">
                  {formData?.cta2?.link || "#"}
                </span>
                <span className="text-xs text-gray-500">Secondary Button</span>
              </div>

              <div className="w-px h-8 bg-gray-200"></div>

              <div className="flex-1 min-w-0">
                <Input
                  value={formData?.cta2?.label || ""}
                  onChange={(e) => {
                    handleCtaLabelChange("cta2", e.target.value);
                  }}
                  placeholder="Enter secondary button text"
                  className="w-full"
                />
              </div>

              <button
                onClick={() => handleChange("cta2", null)}
                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
              >
                ×
              </button>
            </div>
          )}

          {/* Add Second Button */}
          {!formData?.cta2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleChange("cta2", {
                  label: "Button 2",
                  link: "#contact"
                })
              }
              className="w-full"
            >
              + Add Second Button
            </Button>
          )}
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Use action-oriented text for buttons like
            "View Menu", "Book Now", "Get Started". The first button is
            required, the second is optional.
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutSection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler for updating individual highlights
  const handleHighlightChange = (index, newValue) => {
    const updatedHighlights = [...(formData?.highlights || [])];
    updatedHighlights[index] = newValue;
    handleChange("highlights", updatedHighlights);
  };

  // Handler for adding new highlight
  const addHighlight = () => {
    const updatedHighlights = [
      ...(formData?.highlights || []),
      "New Highlight"
    ];
    handleChange("highlights", updatedHighlights);
  };

  // Handler for removing highlight
  const removeHighlight = (index) => {
    const updatedHighlights = [...(formData?.highlights || [])];
    updatedHighlights.splice(index, 1);
    handleChange("highlights", updatedHighlights);
  };

  return (
    <div className="pt-1 space-y-6">
      {/* About Content Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">About Content</h3>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Section Heading
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the main title for your about section
          </p>
          <Input
            placeholder="e.g., Our Story, About Us"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">Description</Label>
          <p className="text-xs text-gray-500 mb-2">
            Write a detailed description about your business
          </p>
          <Textarea
            placeholder="Tell your story, history, mission, and what makes you special..."
            value={formData?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full min-h-[120px]"
            rows={5}
          />
        </div>
      </div>

      {/* About Image Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">About Image</h3>
        </div>

        <div>
          <Label className="text-sm font-medium block mb-2">
            Upload About Image
          </Label>
          <p className="text-xs text-gray-500 mb-3">
            Upload an image that represents your business (restaurant interior,
            team photo, etc.)
          </p>
          <ImageUploader
            maxSizeInMB={5}
            multiple={false}
            images={
              typeof formData?.image === "object" ? formData?.image : null
            }
            onImagesChange={(images) => {
              handleChange("image", images);
            }}
            isEditMode={false}
          />
        </div>
      </div>

      {/* Highlights Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Key Highlights
          </h3>
        </div>

        <div className="space-y-1 mb-4">
          <Label className="text-sm font-medium">Business Highlights</Label>
          <p className="text-xs text-gray-500">
            Add key points that highlight what makes your business special
          </p>
        </div>

        <div className="space-y-3">
          {(formData?.highlights || [])?.map((highlight, index) => (
            <div
              key={index}
              className="relative flex items-center gap-3 p-3 bg-white border rounded-md hover:border-gray-300 transition-colors"
            >
              {/* Delete Icon (only show if more than 1 highlight) */}
              {(formData?.highlights || []).length > 1 && (
                <button
                  onClick={() => removeHighlight(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded"
                >
                  ×
                </button>
              )}

              <div className="flex flex-col min-w-0 w-20">
                <span className="text-xs text-gray-500">
                  Highlight {index + 1}
                </span>
              </div>

              <div className="w-px h-8 bg-gray-200"></div>

              <div className="flex-1 min-w-0">
                <Input
                  value={highlight || ""}
                  onChange={(e) => {
                    handleHighlightChange(index, e.target.value);
                  }}
                  placeholder="e.g., 25+ Years Experience"
                  className="w-full"
                />
              </div>
            </div>
          ))}

          {/* Add New Highlight */}
          {(formData?.highlights || []).length < 6 && (
            <Button
              variant="outline"
              size="sm"
              onClick={addHighlight}
              className="w-full"
            >
              + Add Highlight
            </Button>
          )}
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Keep highlights short and impactful like
            "Award-Winning Chefs", "25+ Years Experience", "Fresh Daily
            Ingredients". Maximum 6 highlights recommended.
          </p>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler for updating individual service items
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...(formData?.items || [])];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    handleChange("items", updatedItems);
  };

  // Handler for adding new service item
  const addItem = () => {
    const newItem = {
      title: "New Service",
      description: "Description of your service",
      image: null
    };
    const updatedItems = [...(formData?.items || []), newItem];
    handleChange("items", updatedItems);
  };

  // Handler for removing service item
  const removeItem = (index) => {
    const updatedItems = [...(formData?.items || [])];
    updatedItems.splice(index, 1);
    handleChange("items", updatedItems);
  };

  return (
    <div className="pt-1 space-y-6">
      {/* Services Header Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Services Header
          </h3>
        </div>

        {/* Section Heading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Section Heading
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the main title for your services section
          </p>
          <Input
            placeholder="e.g., Our Specialties, Our Services"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Initial Show Count */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Initial Display Count
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            How many items to show initially (others will be behind "Show More")
          </p>
          <Input
            type="number"
            min="1"
            max="12"
            placeholder="4"
            value={formData?.initialShowCount || ""}
            onChange={(e) =>
              handleChange("initialShowCount", parseInt(e.target.value) || 4)
            }
            className="w-full"
          />
        </div>

        {/* CTA Button Text */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Call-to-Action Text
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Text for the action button at the bottom of the section
          </p>
          <Input
            placeholder="e.g., View Full Menu, See All Services"
            value={formData?.cta || ""}
            onChange={(e) => handleChange("cta", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Service Items Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">Service Items</h3>
        </div>

        <div className="space-y-1 mb-4">
          <Label className="text-sm font-medium">Services/Products List</Label>
          <p className="text-xs text-gray-500">
            Add and customize your service items with title, description, and
            image
          </p>
        </div>

        <div className="space-y-4">
          {(formData?.items || [])?.map((item, index) => (
            <div
              key={index}
              className="relative p-4 bg-white border rounded-lg hover:border-gray-300 transition-colors"
            >
              {/* Delete Icon (only show if more than 1 item) */}
              {(formData?.items || []).length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded"
                >
                  ×
                </button>
              )}

              <div className="space-y-4">
                {/* Item Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Item {index + 1}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Service Title</Label>
                  <Input
                    placeholder="e.g., North Indian Classics"
                    value={item?.title || ""}
                    onChange={(e) =>
                      handleItemChange(index, "title", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    placeholder="Brief description of this service..."
                    value={item?.description || ""}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full min-h-[80px]"
                    rows={3}
                  />
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Service Image</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Upload an image representing this service
                  </p>
                  <ImageUploader
                    maxSizeInMB={3}
                    multiple={false}
                    images={
                      typeof item?.image === "object" && item?.image !== null
                        ? item?.image
                        : null
                    }
                    onImagesChange={(images) => {
                      handleItemChange(index, "image", images);
                    }}
                    isEditMode={false}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add New Item */}
          {(formData?.items || []).length < 12 && (
            <Button
              variant="outline"
              size="sm"
              onClick={addItem}
              className="w-full"
            >
              + Add Service Item
            </Button>
          )}
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Keep titles concise and descriptions brief but
            descriptive. High-quality images work best. Maximum 12 items
            recommended for performance.
          </p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUsSection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler for updating individual points
  const handlePointChange = (index, newValue) => {
    const updatedPoints = [...(formData?.points || [])];
    updatedPoints[index] = newValue;
    handleChange("points", updatedPoints);
  };

  // Handler for adding new point
  const addPoint = () => {
    const updatedPoints = [...(formData?.points || []), "New Point"];
    handleChange("points", updatedPoints);
  };

  // Handler for removing point
  const removePoint = (index) => {
    const updatedPoints = [...(formData?.points || [])];
    updatedPoints.splice(index, 1);
    handleChange("points", updatedPoints);
  };

  return (
    <div className="pt-1 space-y-6">
      {/* Section Header */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Section Header
          </h3>
        </div>

        {/* Section Heading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Section Heading
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the main title for this section
          </p>
          <Input
            placeholder="e.g., Why Dine With Us, Why Choose Us"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Key Points Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">Key Points</h3>
        </div>

        <div className="space-y-1 mb-4">
          <Label className="text-sm font-medium">Unique Selling Points</Label>
          <p className="text-xs text-gray-500">
            Add compelling reasons why customers should choose your business
          </p>
        </div>

        <div className="space-y-3">
          {(formData?.points || [])?.map((point, index) => (
            <div
              key={index}
              className="relative flex items-center gap-3 p-3 bg-white border rounded-md hover:border-gray-300 transition-colors"
            >
              

              <div className="flex flex-col min-w-0 w-20">
                <span className="text-xs text-gray-500">Point {index + 1}</span>
              </div>

              <div className="w-px h-8 bg-gray-200"></div>

              <div className="flex-1 min-w-0">
                <Input
                  value={point || ""}
                  onChange={(e) => {
                    handlePointChange(index, e.target.value);
                  }}
                  placeholder="e.g., Authentic Traditional Recipes"
                  className="w-full"
                />
              </div>

              {/* Delete Icon (only show if more than 1 point) */}
              {(formData?.points || []).length > 1 && (
                <button
                  onClick={() => removePoint(index)}
                  className="top-2 right-2 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          {/* Add New Point */}
          {(formData?.points || []).length < 8 && (
            <Button
              variant="outline"
              size="sm"
              onClick={addPoint}
              className="w-full"
            >
              + Add Key Point
            </Button>
          )}
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Keep points concise and benefit-focused like
            "Fresh Ingredients Daily", "24/7 Customer Support", "Free Delivery".
            Maximum 8 points recommended for optimal readability.
          </p>
        </div>
      </div>
    </div>
  );
};

const GallerySection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler for removing individual image
  const removeImage = (index) => {
    const updatedImages = [...(formData?.images || [])];
    updatedImages.splice(index, 1);
    handleChange("images", updatedImages);
  };

  // Handler for adding new images
  const handleImagesAdd = (newImages) => {
    console.log("getting the data :", newImages);

    if (Array.isArray(newImages)) {
      handleChange("images", newImages);
    }
  };

  return (
    <div className="pt-1 space-y-6">
      {/* Section Header */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Gallery Header
          </h3>
        </div>

        {/* Section Heading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Gallery Heading
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the title for your image gallery
          </p>
          <Input
            placeholder="e.g., Inside Spice Garden, Our Gallery"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Add New Images
          </h3>
        </div>

        <div>
          <Label className="text-sm font-medium block mb-2">
            Upload Gallery Images
          </Label>
          <p className="text-xs text-gray-500 mb-3">
            Upload multiple high-quality images for your gallery. You can select
            multiple images at once.
          </p>
          <ImageUploader
            maxSizeInMB={2}
            multiple={true}
            images={formData?.images || []}
            onImagesChange={handleImagesAdd}
            isEditMode={false}
            showPreview={false}
            maxImages={20}
          />
        </div>

        <div className="mt-3 p-2 bg-green-50 rounded border-l-4 border-green-400">
          <p className="text-xs text-green-700">
            <strong>Tip:</strong> Upload high-resolution images (at least
            800x600px) for best quality. You can upload multiple images at once
            by selecting them together.
          </p>
        </div>
      </div>

      {/* Current Images Section */}
      {(formData?.images || []).length > 0 && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-800">
              Current Gallery Images ({(formData?.images || []).length})
            </h3>
          </div>

          <div className="space-y-1 mb-4">
            <Label className="text-sm font-medium">Manage Your Images</Label>
            <p className="text-xs text-gray-500">
              Preview and remove images from your gallery
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(formData?.images || []).map((image, index) => (
              <div
                key={image?.id || index}
                className="relative group bg-white border rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                {/* Delete Button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Image Preview */}
                {image?.url && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Image Info */}
                <div className="p-2 bg-gray-50">
                  <p className="text-xs text-gray-600 truncate">
                    Image {index + 1}
                  </p>
                  {image?.id && (
                    <p className="text-xs text-gray-400 truncate font-mono">
                      ID: {image.id}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Images are displayed in the order they were
              uploaded. Click the × button to remove any image. Maximum 20
              images recommended for optimal performance.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(formData?.images || []).length === 0 && (
        <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No images uploaded yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Use the upload section above to add your first gallery images
          </p>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection = ({ formData, setFormData }) => {
  const reviews = formData?.reviews || [];

  // Generic change handler
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Update specific review
  const handleReviewChange = (reviewIndex, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[reviewIndex] = {
      ...updatedReviews[reviewIndex],
      [field]: value
    };
    handleChange("reviews", updatedReviews);
  };

  // Add review at the top
  const handleAddReview = () => {
    const newReview = {
      name: "",
      message: "",
      rating: 5
    };
    handleChange("reviews", [newReview, ...reviews]);
  };

  // Remove review
  const handleRemoveReview = (reviewIndex) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(reviewIndex, 1);
    handleChange("reviews", updatedReviews);
  };

  return (
    <div className="pt-1 space-y-6">
      {/* Edit Section Heading */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-sm font-semibold text-gray-800">Edit Section</h3>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Section Heading</Label>
          <Input
            placeholder="e.g., What Our Guests Say, Customer Reviews"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Reviews Management */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Customer Reviews
          </h3>
          <Button onClick={handleAddReview} size="sm" variant="outline">
            + Add Review
          </Button>
        </div>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 bg-white border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Review #{index + 1}
                </span>
                <Button
                  onClick={() => handleRemoveReview(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {/* Customer Name */}
                <div>
                  <Label className="text-xs font-medium block mb-1">
                    Customer Name
                  </Label>
                  <Input
                    value={review?.name || ""}
                    onChange={(e) =>
                      handleReviewChange(index, "name", e.target.value)
                    }
                    placeholder="e.g., Rajesh Kumar, Priya Sharma"
                    className="w-full"
                  />
                </div>

                {/* Review Message */}
                <div>
                  <Label className="text-xs font-medium block mb-1">
                    Review Message
                  </Label>
                  <Textarea
                    value={review?.message || ""}
                    onChange={(e) =>
                      handleReviewChange(index, "message", e.target.value)
                    }
                    placeholder="Enter the customer's review or testimonial..."
                    className="w-full min-h-[80px] resize-none"
                    rows={3}
                  />
                </div>

                {/* Star Rating */}
                <div>
                  <Label className="text-xs font-medium block mb-2">
                    Star Rating
                  </Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="p-0 h-8 w-8"
                        onClick={() =>
                          handleReviewChange(index, "rating", star)
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= (review?.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      {review?.rating || 0} star
                      {(review?.rating || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-sm">No reviews added yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Click "Add Review" to add your first customer testimonial
              </p>
            </div>
          )}
        </div>

        {/* Helpful Tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Include authentic customer reviews with names
            and specific details. High ratings (4-5 stars) work best for
            building trust with potential customers.
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  return (
    <div className="space-y-6">
      {/* Edit Section Heading */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-sm font-semibold text-gray-800">
          Edit Contact Section
        </h3>

        {/* Section Heading */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Section Heading</Label>
          <Input
            placeholder="e.g., Visit Us Today"
            value={formData?.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            Address
          </Label>
          <Textarea
            placeholder="Enter the business address"
            value={formData?.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            rows={2}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-1">
            <Phone className="w-4 h-4 text-gray-500" />
            Phone
          </Label>
          <Input
            placeholder="e.g., +91 98765 43210"
            value={formData?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-500" />
            Email
          </Label>
          <Input
            placeholder="e.g., reservations@spicegarden.in"
            type="email"
            value={formData?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Hours */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" />
            Hours
          </Label>
          <Input
            placeholder="e.g., Daily: 11:00 AM - 11:00 PM"
            value={formData?.hours || ""}
            onChange={(e) => handleChange("hours", e.target.value)}
          />
        </div>

        {/* Google Map Embed URL */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Google Maps Embed URL</Label>
          <Textarea
            placeholder="Paste your Google Maps embed URL"
            value={formData?.mapEmbedUrl || ""}
            onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Live Map Preview */}
      {formData?.mapEmbedUrl && (
        <div className="p-4 bg-gray-50 border rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Map Preview
          </h4>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={formData.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};


const FooterSection = ({ formData, setFormData }) => {
  // Generic change handler for nested keys
  const handleChange = (field, value) => {
    setFormData((prev) => updateNestedDataFunctional(prev, field, value));
  };

  // Handler for updating social media links
  const handleSocialChange = (platform, value) => {
    const updatedSocials = {
      ...formData?.socials,
      [platform]: value
    };
    // Remove empty values
    if (!value || value.trim() === '') {
      delete updatedSocials[platform];
    }
    handleChange("socials", updatedSocials);
  };

  // Available social media platforms
  const socialPlatforms = [
    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
    { key: 'twitter', label: 'Twitter/X', placeholder: 'https://twitter.com/yourhandle' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourcompany' },
    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel' },
    { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourhandle' },
    { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/your-number' },
    { key: 'email', label: 'Email', placeholder: 'mailto:your@email.com' },
    { key: 'phone', label: 'Phone', placeholder: 'tel:+1234567890' },
    { key: 'website', label: 'Website', placeholder: 'https://yourwebsite.com' }
  ];

  return (
    <div className="pt-1 space-y-6">
      {/* Copyright Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">Copyright & Legal</h3>
        </div>

        {/* Copyright Text */}
        <div className="space-y-2">
          <Label className="text-sm font-medium block mb-2">
            Copyright Text
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the copyright notice for your footer
          </p>
          <Input
            placeholder="© 2025 Your Business Name. All rights reserved."
            value={formData?.copyright || ""}
            onChange={(e) => handleChange("copyright", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Social Media Links
          </h3>
        </div>

        <div className="space-y-1 mb-4">
          <Label className="text-sm font-medium">Connect with Your Audience</Label>
          <p className="text-xs text-gray-500">
            Add your social media profiles and contact information. Leave empty to hide any platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.key} className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {platform.label}
              </Label>
              <Input
                placeholder={platform.placeholder}
                value={formData?.socials?.[platform.key] || ""}
                onChange={(e) => handleSocialChange(platform.key, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-700">
            <strong>Tips:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Use full URLs including https:// for web links</li>
            <li>• For WhatsApp, use format: https://wa.me/1234567890</li>
            <li>• For email, use format: mailto:your@email.com</li>
            <li>• For phone, use format: tel:+1234567890</li>
            <li>• Only filled platforms will appear in the footer</li>
          </ul>
        </div>
      </div>

      {/* Active Social Links Preview */}
      {Object.keys(formData?.socials || {}).length > 0 && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-800">
              Active Social Links ({Object.keys(formData?.socials || {}).length})
            </h3>
          </div>

          <div className="space-y-2">
            {Object.entries(formData?.socials || {}).map(([platform, url]) => {
              const platformInfo = socialPlatforms.find(p => p.key === platform);
              return (
                <div key={platform} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {platformInfo?.label || platform}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {url}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const EditTemplateForm = ({ sectionName, formData, setFormData }) => {
  return (
    <>
      {sectionName?.value === "navbar" && (
        <NavSection formData={formData} setFormData={setFormData} />
      )}
      {sectionName?.value === "hero" && (
        <HeroSection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "about" && (
        <AboutSection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "services" && (
        <ServicesSection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "whyChooseUs" && (
        <WhyChooseUsSection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "gallery" && (
        <GallerySection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "testimonials" && (
        <TestimonialsSection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "contact" && (
        <ContactSection formData={formData} setFormData={setFormData} />
      )}

      {sectionName?.value === "footer" && (
        <FooterSection formData={formData} setFormData={setFormData} />
      )}
    </>
  );
};

export default EditTemplateForm;
