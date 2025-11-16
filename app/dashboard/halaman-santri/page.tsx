"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";

export default function HalamanSantri() {
  // Set the initial state to show the halaman-santri view
  const [activeMenu, setActiveMenu] = useState("halaman-santri");

  return (
    <div className="min-h-screen bg-gray-100">
      <Admin initialActiveMenu="halaman-santri" />
    </div>
  );
}