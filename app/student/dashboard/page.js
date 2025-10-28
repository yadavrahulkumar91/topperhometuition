"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import db from "@firebase/firestore";
import { 
  Book, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  Clock as PendingIcon
} from "lucide-react";
import Link from "next/link";

const STATUS_BADGES = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: PendingIcon, text: "Pending" },
  accepted: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Accepted" },
  rejected: { color: "bg-red-100 text-red-800", icon: XCircle, text: "Rejected" },
  completed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle, text: "Completed" }
};

export default function StudentDashboard() {
  const [user, loading] = useAuthState(auth);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "tuitionRequests"),
          where("studentId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoadingRequests(false);
      }
    }
    fetchRequests();
  }, [user]);

  if (loading || loadingRequests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <Link
            href="/signin"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Track your tuition requests and manage your learning journey</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link 
            href="/request-tutor"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">New Tuition Request</h3>
            <p className="text-blue-100">Request a new tutor for any subject</p>
          </Link>

          <Link 
            href="/profile"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">My Profile</h3>
            <p className="text-purple-100">Update your personal information</p>
          </Link>

          <Link 
            href="/messages"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Messages</h3>
            <p className="text-green-100">Chat with your tutors</p>
          </Link>
        </div>

        {/* Tuition Requests */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">My Tuition Requests</h2>
          </div>

          {requests.length === 0 ? (
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by requesting a tutor</p>
              <Link
                href="/request-tutor"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request a Tutor
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {requests.map((request) => {
                const statusInfo = STATUS_BADGES[request.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-wrap gap-6 items-start">
                      <div className="flex-1 min-w-[300px]">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.grade}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.text}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Book className="w-4 h-4" />
                            <span>{request.subjects.join(", ")}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{request.location}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{request.preferredTime}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Requested on {formatDate(request.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {request.tutor && (
                        <div className="flex-1 min-w-[300px]">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Assigned Tutor</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="w-4 h-4" />
                              <span>{request.tutor.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{request.tutor.email}</span>
                            </div>
                            {request.tutor.phone && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{request.tutor.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/request/${request.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FileText className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}