"use client";

export default function PresenceTestPage() {
  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Presence Test (Disabled)
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Liveblocks Removed</h2>
            <div className="text-gray-600">
              <p>Real-time presence tracking has been disabled.</p>
              <p className="mt-2">Liveblocks was causing performance issues and has been removed from the application.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">What Changed</h3>
            <ul className="space-y-2 text-gray-700">
              <li>❌ Liveblocks removed</li>
              <li>✅ Performance improved</li>
              <li>✅ No more glitching on actions</li>
              <li>✅ Cleaner codebase</li>
            </ul>
          </div>
        </div>
      </div>
  );
}