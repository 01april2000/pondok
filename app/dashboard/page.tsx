"use client";

import { useState } from "react";
import Admin from "@/components/dashboard/admin";
import Bendahara from "@/components/dashboard/bendahara";
import User from "@/components/dashboard/user";

type UserRole = "admin" | "bendahara" | "user" | null;

export default function Dashboard() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [showDevMenu, setShowDevMenu] = useState(false);

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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
            <p className="text-gray-600">Please use the development role selector to view different dashboard views.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
      {/* Render the appropriate dashboard component */}
      {renderDashboardComponent()}

      {/* Floating Development Role Selector */}
      <div className="fixed bottom-8 right-8 z-50">
        {showDevMenu && (
          <div className="mb-4 bg-white rounded-lg shadow-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Dev Role Selector</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setCurrentRole("admin");
                  setShowDevMenu(false);
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors text-left ${
                  currentRole === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => {
                  setCurrentRole("bendahara");
                  setShowDevMenu(false);
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors text-left ${
                  currentRole === "bendahara"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Bendahara
              </button>
              <button
                onClick={() => {
                  setCurrentRole("user");
                  setShowDevMenu(false);
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors text-left ${
                  currentRole === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                User
              </button>
              <button
                onClick={() => {
                  setCurrentRole(null);
                  setShowDevMenu(false);
                }}
                className="px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-colors text-left"
              >
                Clear
              </button>
            </div>
            {currentRole && (
              <p className="mt-3 text-xs text-gray-600">
                Current: <span className="font-semibold capitalize">{currentRole}</span>
              </p>
            )}
          </div>
        )}
        
        {/* Floating Dev Button */}
        <button
          onClick={() => setShowDevMenu(!showDevMenu)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105"
          title="Development Role Selector"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}