"use client";

export default function Bendahara() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bendahara Dashboard</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-yellow-500 pl-4">
          <h3 className="font-semibold text-gray-700">Financial Overview</h3>
          <p className="text-gray-600">View financial summaries and reports</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-semibold text-gray-700">Income Tracking</h3>
          <p className="text-gray-600">Monitor and record income sources</p>
        </div>
        <div className="border-l-4 border-red-500 pl-4">
          <h3 className="font-semibold text-gray-700">Expense Management</h3>
          <p className="text-gray-600">Track and categorize expenses</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-gray-700">Budget Planning</h3>
          <p className="text-gray-600">Create and manage budget allocations</p>
        </div>
      </div>
    </div>
  );
}