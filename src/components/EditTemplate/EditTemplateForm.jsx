"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import ImageUploader from "../ui/inputs/ImageUploader";
import { Input } from "../ui/input";

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

const EditTemplateForm = ({ sectionName, formData, setFormData }) => {
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

export default EditTemplateForm;
