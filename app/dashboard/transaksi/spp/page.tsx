"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";

export default function SPPPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Admin initialActiveMenu="spp" />
    </div>
  );
}