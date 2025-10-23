"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock search function - replace with your actual search API
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        // Mock search results
        setSearchResults(
          [
            {
              id: 1,
              title: "Introduction to React",
              type: "Course",
              url: "/course/react-intro",
            },
            {
              id: 2,
              title: "JavaScript Fundamentals",
              type: "Lesson",
              url: "/lesson/js-fundamentals",
            },
            {
              id: 3,
              title: "Web Development Bootcamp",
              type: "Program",
              url: "/program/web-dev",
            },
            {
              id: 4,
              title: "Database Design Principles",
              type: "Course",
              url: "/course/database-design",
            },
            {
              id: 5,
              title: "Python for Beginners",
              type: "Course",
              url: "/course/python-basics",
            },
          ].filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement your search navigation logic here
      console.log("Searching for:", searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Course":
        return "📚";
      case "Lesson":
        return "📝";
      case "Program":
        return "🎓";
      default:
        return "🔍";
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div
          className={`
                relative bg-white/60 backdrop-blur-sm rounded-2xl border transition-all duration-300
                ${
                  isSearchFocused
                    ? "border-blue-300/50 shadow-lg ring-4 ring-blue-100/50"
                    : "border-white/30 shadow-sm hover:border-blue-200/50"
                }
              `}
        >
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, lessons, programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full pl-12 pr-12 py-3 bg-transparent placeholder-slate-400 text-slate-700 focus:outline-none font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200/50 rounded-full transition-colors"
            >
              <XMarkIcon className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl border border-white/30 shadow-xl max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                Search Results
              </div>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-50/50 transition-colors group"
                  onClick={() => setIsSearchFocused(false)}
                >
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                  <div className="flex-1">
                    <div className="font-medium text-slate-700 group-hover:text-blue-700">
                      {result.title}
                    </div>
                    <div className="text-xs text-slate-500">{result.type}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Header;
