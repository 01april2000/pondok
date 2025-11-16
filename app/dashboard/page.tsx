export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h2>
          <p className="text-gray-600">View your analytics data here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Reports</h2>
          <p className="text-gray-600">Access your reports and insights.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Settings</h2>
          <p className="text-gray-600">Manage your account settings.</p>
        </div>
      </div>
    </div>
  );
}