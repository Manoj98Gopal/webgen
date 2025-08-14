"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "../ui/sheet";
import { Button } from "../ui/button";
import EditTemplateForm from "./EditTemplateForm";

const EditSheet = ({ isOpen, onOpenChange, sectionName, webData }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>
            {sectionName ? `Edit ${sectionName?.label}` : "Edit Section"}
          </SheetTitle>
          <SheetDescription>
            Make changes to the {sectionName?.label?.toLowerCase()} section
            here.
          </SheetDescription>
        </SheetHeader>

        {/* Editable form or controls for that section */}
        <div className="px-4 h-full overflow-auto">
          <EditTemplateForm sectionName={sectionName} webData={webData} />
        </div>

        <SheetFooter>
          <div className="flex justify-end gap-2">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
            <Button type="submit">Save changes</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
