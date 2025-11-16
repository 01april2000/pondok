"use client";

export default function User() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-indigo-500 pl-4">
          <h3 className="font-semibold text-gray-700">Profile Information</h3>
          <p className="text-gray-600">View and update your profile details</p>
        </div>
        <div className="border-l-4 border-teal-500 pl-4">
          <h3 className="font-semibold text-gray-700">Activity History</h3>
          <p className="text-gray-600">Check your recent activities and logs</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-4">
          <h3 className="font-semibold text-gray-700">Notifications</h3>
          <p className="text-gray-600">View your notifications and messages</p>
        </div>
        <div className="border-l-4 border-pink-500 pl-4">
          <h3 className="font-semibold text-gray-700">Settings</h3>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </div>
    </div>
  );
}