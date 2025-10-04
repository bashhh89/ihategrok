"use client";

export default function AdminPresenceDashboard() {
  return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">System monitoring (Liveblocks removed)</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main presence monitoring area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Live User Presence</h2>
                <p className="text-gray-600 mb-6">
                  System monitoring and analytics.
                </p>

                <div className="text-gray-500 p-8 text-center">
                  <p>Real-time presence tracking disabled (Liveblocks removed)</p>
                </div>
              </div>
            </div>

            {/* Sidebar with additional admin info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Liveblocks Connection</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Analytics Server</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-600">Running</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <a
                    href="/analytics"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    View Analytics Dashboard
                  </a>
                  <a
                    href="/workbench"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Open SOW Workbench
                  </a>
                  <a
                    href="/settings"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    System Settings
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>User presence tracking active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Analytics server running</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Liveblocks connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}