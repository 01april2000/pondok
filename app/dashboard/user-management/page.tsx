"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";

export default function UserManagementPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Admin initialActiveMenu="user-management" />
    </div>
  );
}