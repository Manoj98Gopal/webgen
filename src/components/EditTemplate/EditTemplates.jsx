import React, { useState } from "react";
import EditTemplateHeader from "./EditTemplateHeader";
import EditSheet from "./EditSheet";

const EditTemplates = ({
  children,
  isEditing,
  setIsEditing,
  webData,
  setWebData
}) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setIsSheetOpen(true);
    // Find element by ID and scroll smoothly
    const targetElement = document.getElementById(
      section.value?.toLowerCase().replace(/\s+/g, "")
    );
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return (
    <div>
      <EditTemplateHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSectionSelect={handleSectionSelect}
      />
      <EditSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        sectionName={selectedSection}
        webData={webData}
        setWebData={setWebData}
      />
      {children}
    </div>
  );
};

export default EditTemplates;
