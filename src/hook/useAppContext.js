"use client";

import { AppContext } from "@/context/ContextProvider";
import { useContext } from "react";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
