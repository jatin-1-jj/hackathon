import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        🎓 Alumni Management Platform
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Connect • Network • Grow Together
      </p>

      <div className="flex gap-4">
        <Link
          to="/alumni"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          View Alumni
        </Link>
        <Link
          to="/events"
          className="px-4 py-2 rounded-lg bg-purple-600 text-white shadow hover:bg-purple-700 transition"
        >
          Upcoming Events
        </Link>
        <Link
          to="/donations"
          className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition"
        >
          Support & Donate
        </Link>
      </div>
    </div>
  );
}