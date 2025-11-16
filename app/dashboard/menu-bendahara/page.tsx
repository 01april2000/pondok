"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";

export default function MenuBendaharaPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Admin initialActiveMenu="menu-bendahara" />
    </div>
  );
}