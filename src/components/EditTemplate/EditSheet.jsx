"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "../ui/dialog";
import { Button } from "../ui/button";
import EditTemplateForm from "./EditTemplateForm";

const EditSheet = ({
  isOpen,
  onOpenChange,
  sectionName,
  webData,
  setWebData
}) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(webData[sectionName?.value] || {});
  }, [sectionName]);

  const saveChanges = () => {
    setWebData((prevData) => ({
      ...prevData,
      [sectionName?.value]: formData
    }));
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6">
          <DialogTitle>
            {sectionName ? `Edit ${sectionName?.label}` : "Edit Section"}
          </DialogTitle>
          <DialogDescription>
            Make changes to the {sectionName?.label?.toLowerCase()} section
            here.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 max-h-[70vh] overflow-auto">
          <EditTemplateForm
            sectionName={sectionName}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button type="submit" onClick={saveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSheet;
