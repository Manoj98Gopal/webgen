"use client";

import DemoTemplate from "@/components/DemoTemplate";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <DemoTemplate />
    </div>
  );
};

export default page;
