"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import db from "@firebase/firestore";
import { Book, MapPin, Clock, Calendar, Filter } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import Link from "next/link";

export default function Vacancies() {
  const [user] = useAuthState(auth);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRequests, setUserRequests] = useState([]);
  const [filters, setFilters] = useState({
    grade: "",
    subject: "",
    location: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch vacancies
        const q = query(collection(db, "vacancies"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        setVacancies(data);

        // Fetch user's requests if logged in
        if (user) {
          const requestsRef = collection(db, "requests");
          const requestsQuery = query(requestsRef);
          const requestsSnapshot = await getDocs(requestsQuery);
          const userRequestsData = requestsSnapshot.docs
            .filter(doc => doc.data().userId === user.uid)
            .map(doc => doc.id);
          setUserRequests(userRequestsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const filteredVacancies = vacancies.filter(vacancy => {
    return (
      (!filters.grade || vacancy.grade === filters.grade) &&
      (!filters.subject || vacancy.subjects.includes(filters.subject)) &&
      (!filters.location || vacancy.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Teaching Vacancies</h1>
          <p className="text-lg text-gray-600">Find teaching opportunities near you</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">All Grades</option>
                <option value="1-5">Grade 1-5</option>
                <option value="6-8">Grade 6-8</option>
                <option value="9-10">Grade 9-10</option>
                <option value="11-12 Science">Grade 11-12 Science</option>
                <option value="11-12 Management">Grade 11-12 Management</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                placeholder="Search subjects..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="Search location..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button
              onClick={() => setFilters({ grade: "", subject: "", location: "" })}
              className="mt-auto p-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Vacancies List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredVacancies.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No vacancies found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap gap-6 items-start">
                  <div className="flex-1 min-w-[300px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {vacancy.grade} - {vacancy.subjects.join(", ")}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{vacancy.location}</span>
                      </div>
                      
                      {vacancy.preferredTime && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{vacancy.preferredTime}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Posted on {formatDate(vacancy.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {vacancy.additionalInfo && (
                    <div className="flex-1 min-w-[300px]">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Additional Information</h4>
                      <p className="text-gray-600 text-sm">{vacancy.additionalInfo}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {userRequests.includes(vacancy.requestId) ? (
                      <Link
                        href={`/applications/${vacancy.id}`}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        View Applications
                      </Link>
                    ) : (
                      <Link
                        href={`/apply/${vacancy.id}`}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Apply Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}