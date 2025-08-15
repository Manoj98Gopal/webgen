import React, { useCallback, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ImageUploader = ({
  multiple = false,
  maxImages = 5,
  maxSizeInMB = 5,
  images = [],
  onImagesChange,
  className = "",
  disabled = false,
  showPreview = true,
  isEditMode=false
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const processFiles = useCallback(
    async (fileList) => {
      const files = Array.from(fileList);
      console.log("as images :", images);
      console.log("as fileList :", fileList);

      // Validation
      if (!multiple && files.length > 1) {
        toast.error("Only one image is allowed.");

        return;
      }

      if (multiple && images.length + files.length > maxImages) {
        toast.error(`You can upload up to ${maxImages} images.`);

        return;
      }

      const validFiles = [];
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image file.`);

          continue;
        }

        if (file.size > maxSizeInBytes) {
          toast.error(`${file.name} exceeds the ${maxSizeInMB}MB limit.`);

          continue;
        }

        validFiles.push(file);
      }

      if (validFiles.length === 0) return;

      const newImages = validFiles.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        url: URL.createObjectURL(file),
        // action: GENERAL_DATA.ACTIONS.UPLOAD
      }));

      if (multiple) {
        console.log("as images :", images);
        console.log("as new images :", newImages);
        onImagesChange([...images, ...newImages]);
      } else {
        // For single uploader, return object instead of array
        onImagesChange(newImages[0]);
      }

      toast.success(
        `${newImages.length} image${newImages.length > 1 ? "s" : ""} uploaded.`
      );
    },
    [images, maxImages, maxSizeInBytes, maxSizeInMB, multiple, onImagesChange]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragActive(false);
      if (disabled) return;
      processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles]
  );

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      if (!disabled) setIsDragActive(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleFileSelect = useCallback(
    (e) => {
      const files = e.target.files;
      if (files) processFiles(files);
      e.target.value = "";
    },
    [processFiles]
  );

  const removeImage = useCallback(
    (imageId) => {
      if (multiple) {
        const updatedImages = images.filter((img) => img.id !== imageId);
        onImagesChange(updatedImages);
      } else {
        // For single uploader, return null to show uploader again
        onImagesChange(null);
      }
    },
    [images, onImagesChange, multiple]
  );

  // For single uploader, check if we have an image (object)
  const singleImage =
    !multiple && images && typeof images === "object" ? images : null;
  const hasImages = multiple
    ? Array.isArray(images) && images.length > 0
    : singleImage;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Show uploader only if no images for single mode, or always for multiple mode */}
      {(multiple || !hasImages) && (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer flex-1",
            isDragActive && !disabled
              ? "border-primary bg-primary/5"
              : "border-gray-300",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "hover:border-primary"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-4 rounded-full bg-gray-100 mb-4">
              <Upload className="h-8 w-8 text-gray-600" />
            </div>

            <p className="text-sm text-gray-600 mb-2">
              {isDragActive
                ? "Drop images here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500">
              {multiple ? `Up to ${maxImages} images` : "Single image"} • Max{" "}
              {maxSizeInMB}MB each
            </p>
          </CardContent>

          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </Card>
      )}

      {/* Preview for single image - replaces the uploader */}
      {!multiple && singleImage && showPreview && (
        <Card className="relative overflow-hidden">
          <div className="relative group">
            <img
              src={singleImage.url}
              alt={singleImage.name || "Uploaded image"}
              className="w-full h-64 object-cover"
            />
            {!disabled && !isEditMode && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeImage(singleImage.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white/90 hover:bg-white"
              >
                <X className="w-4 h-4 text-red-600" />
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Preview for multiple images */}
      {multiple &&
        showPreview &&
        Array.isArray(images) &&
        images?.length > 0 && (
          <div className="space-y-2 flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">
                Uploaded {images?.length}{" "}
                {images?.length > 1 ? "images" : "image"}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onImagesChange([])}
                disabled={disabled}
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images?.map((image) => (
                <div key={image?.id} className="relative group">
                  <img
                    src={image?.url}
                    alt={image?.name || "Uploaded image"}
                    className="rounded-md w-full h-32 object-cover border"
                  />
                  {!disabled && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeImage(image?.id)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default ImageUploader;
