"use client";
import { User } from "lucide-react";
import Link from "next/link";

export default function ProfileCard({ user, onSignOut }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-0 shadow-lg overflow-hidden">
          {user?.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-white" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
            {user?.displayName || "Your Profile"}
          </h2>
          <p className="text-gray-600">Account information and settings</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/settings">
          <div className="w-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center">
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </div>
        </Link>
        <button
          onClick={onSignOut}
          className="w-36 bg-white border-2 border-red-200 text-red-600 py-2 px-4 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}