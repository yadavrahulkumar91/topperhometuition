"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import User from "./user";
import Search from "./search";
import {
  MagnifyingGlassIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg"
            : "bg-white/70 backdrop-blur-sm border-b border-white/10"
        }
      `}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="https://storage.googleapis.com/gamechanger-drive-91.appspot.com/104Asset%208%404x.png"
                width={50}
                height={50}
                alt="GameChanger Academy"
                className="relative rounded-full border-2 border-white/50 shadow-lg"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                Topper Home
              </span>
              <div className="text-sm text-slate-600 font-medium -mt-1">
                Tuition Center
              </div>
            </div>
          </Link>

          <Search />

          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
