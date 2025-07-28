import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to your Dashboard
        </h2>
        <p className="text-gray-600 text-lg">
          You are logged in. Start building your profile and sharing projects!
        </p>
      </div>
    </div>
  );
}
