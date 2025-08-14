import React, { useState } from "react";
import EditTemplateHeader from "./EditTemplateHeader";
import EditSheet from "./EditSheet";

const injectProps = (element, props) => {
  if (!React.isValidElement(element)) return element;

  // If it's a DOM element like <div>, recurse into its children
  if (typeof element.type === "string") {
    return React.cloneElement(element, {
      children: React.Children.map(element.props.children, (child) =>
        injectProps(child, props)
      )
    });
  }

  // If it's a custom React component, add the props
  return React.cloneElement(element, {
    ...props,
    children: React.Children.map(element.props.children, (child) =>
      injectProps(child, props)
    )
  });
};

const EditTemplates = ({ children, isEditing, setIsEditing, webData }) => {
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
      />

      {/* Recursively inject props into all nested custom components */}
      {React.Children.map(children, (child) =>
        injectProps(child, { isInsideEditTemplate: true })
      )}
    </div>
  );
};

export default EditTemplates;
