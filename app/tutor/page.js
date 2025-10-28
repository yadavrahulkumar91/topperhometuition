"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import db from "@firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import TutorCard from "../components/tutor/TutorCard";

export default function TutorPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    subjects: [],
    grades: [],
    location: "",
  });

  useEffect(() => {
    let mounted = true;
    async function fetchTutors() {
      try {
        const snap = await getDocs(collection(db, "tutors"));
        const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) setTutors(arr);
      } catch (e) {
        console.error("Failed to load tutors:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTutors();
    return () => (mounted = false);
  }, []);

  const filteredTutors = tutors.filter((tutor) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      tutor.displayName?.toLowerCase().includes(searchLower) ||
      tutor.about?.toLowerCase().includes(searchLower) ||
      tutor.subjects?.some((s) => s.toLowerCase().includes(searchLower)) ||
      tutor.location?.toLowerCase().includes(searchLower);

    const matchesFilters =
      (!filters.subjects.length ||
        tutor.subjects?.some((s) => filters.subjects.includes(s))) &&
      (!filters.grades.length ||
        tutor.grades?.some((g) => filters.grades.includes(g))) &&
      (!filters.location || tutor.location === filters.location);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Tutor</h1>
          <p className="text-gray-600">Browse through our qualified tutors and find the right match for your learning needs.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, subject, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 transition-colors">
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No tutors available</h3>
            <p className="text-gray-600 mt-2">Check back later for new tutors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
