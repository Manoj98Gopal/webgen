import React from "react";
import EditTemplateHeader from "./EditTemplateHeader";

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

const EditTemplates = ({ children, isEditing, setIsEditing }) => {
  return (
    <div>
      <EditTemplateHeader isEditing={isEditing} setIsEditing={setIsEditing} />
      {/* Recursively inject props into all nested custom components */}
      {React.Children.map(children, (child) =>
        injectProps(child, { isInsideEditTemplate: true })
      )}
    </div>
  );
};

export default EditTemplates;
