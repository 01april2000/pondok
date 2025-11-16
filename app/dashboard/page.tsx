"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";
import Bendahara from "@/components/dashboard/bendahara";
import User from "@/components/dashboard/user";

type UserRole = "admin" | "bendahara" | "user" | null;

export default function Dashboard() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const renderDashboardComponent = () => {
    switch (currentRole) {
      case "admin":
        return <Admin />;
      case "bendahara":
        return <Bendahara />;
      case "user":
        return <User />;
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Role</h2>
            <p className="text-gray-600">Please select a role below to view the corresponding dashboard.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Development Role Selector */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Development Role Selector</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentRole("admin")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentRole === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setCurrentRole("bendahara")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentRole === "bendahara"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Bendahara
            </button>
            <button
              onClick={() => setCurrentRole("user")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentRole === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setCurrentRole(null)}
              className="px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
          {currentRole && (
            <p className="mt-3 text-sm text-gray-600">
              Currently viewing as: <span className="font-semibold capitalize">{currentRole}</span>
            </p>
          )}
        </div>
      </div>

      {/* Render the appropriate dashboard component */}
      {renderDashboardComponent()}
    </div>
  );
}