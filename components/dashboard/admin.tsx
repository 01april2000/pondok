"use client";

export default function Admin() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-gray-700">User Management</h3>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-semibold text-gray-700">System Settings</h3>
          <p className="text-gray-600">Configure system-wide settings</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-semibold text-gray-700">Reports</h3>
          <p className="text-gray-600">View system reports and analytics</p>
        </div>
      </div>
    </div>
  );
}