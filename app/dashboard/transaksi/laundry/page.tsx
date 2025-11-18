"use client";

import Admin from "@/components/dashboard/admin";

export default function LaundryPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Admin initialActiveMenu="laundry" />
    </div>
  );
}