"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";

export default function UserManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Admin initialActiveMenu="user-management" />
    </div>
  );
}