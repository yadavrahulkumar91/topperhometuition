"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  MagnifyingGlassIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const User = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [user, loading, error] = useAuthState(auth);

  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user menu when clicking outside of it
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      // Close notifications dropdown when clicking outside of it
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get display name or fallback
  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    // Extract first part of email as fallback
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  // Get user role (you can customize this based on your user data structure)
  const getUserRole = () => {
    // You can add custom claims or user role logic here
    // For now, we'll use a simple default
    return user?.email ? "Member" : "Guest";
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen((s) => !s)}
              className="relative p-2 hover:bg-white/50 rounded-xl transition-colors"
              aria-expanded={isNotificationsOpen}
              aria-haspopup="true"
            >
              <BellIcon className="h-6 w-6 text-slate-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl border border-white/30 shadow-xl z-50">
                <div className="p-3 border-b border-slate-100 font-semibold text-slate-700">
                  Notifications
                </div>
                <div className="max-h-64 overflow-auto">
                  {/* Example notifications - replace with real data when available */}
                  {notifications > 0 ? (
                    <ul>
                      <li className="px-3 py-2 hover:bg-slate-50 border-b border-slate-100">
                        <div className="text-sm text-slate-700">
                          You have a new message
                        </div>
                        <div className="text-xs text-slate-400">
                          2 hours ago
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <div className="p-4 text-sm text-slate-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-slate-100">
                  <button className="w-full text-sm text-blue-600 hover:underline">
                    View all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-xl transition-colors group"
            >
              {/* User Avatar */}
              {user.photoURL ? (
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/50">
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {getUserInitials()}
                </div>
              )}

              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-slate-700">
                  {getDisplayName()}
                </div>
                <div className="text-xs text-slate-500">{getUserRole()}</div>
              </div>
              <ChevronDownIcon
                className={`h-4 w-4 text-slate-500 transition-transform ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl border border-white/30 shadow-xl z-50">
                <div className="p-4 border-b border-slate-100">
                  <div className="font-semibold text-slate-700">
                    {getDisplayName()}
                  </div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                  {user.emailVerified && (
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-3 py-2 hover:bg-blue-50/50 rounded-lg transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Squares2X2Icon className="h-5 w-5 text-slate-500" />{" "}
                    <span className="text-slate-700">Dashboard</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-3 py-2 hover:bg-blue-50/50 rounded-lg transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="h-5 w-5 text-slate-500" />
                    <span className="text-slate-700">Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-50/50 rounded-lg transition-colors text-left"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                    <span className="text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-3">
          <Link
            href="/signin"
            className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-300 hover:shadow-md"
          >
            <UserIcon className="h-5 w-5 text-slate-600" />
            <span className="font-medium text-slate-700">Sign In</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            <UserPlusIcon className="h-5 w-5" />
            <span className="font-medium">Sign Up</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default User;
