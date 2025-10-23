"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
// import db from "../firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";

import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { User, Mail, LogOut, Loader } from "lucide-react";

export default function Dashboard() {
  // const [books, setBooks] = useState([]);
  // const [booksLoading, setBooksLoading] = useState(true);
  // const [booksError, setBooksError] = useState(null);
  // const [subscribed, setSubscribed] = useState({});
  // const [mcqCount, setMcqCount] = useState(0);

  const [user, authLoading, authError] = useAuthState(auth);

  // useEffect(() => {
  //   async function fetchBooks() {
  //     try {
  //       const response = await axios.get(`/api/notes`);
  //       setBooks(response.data);
  //     } catch (err) {
  //       setBooksError(err?.message || "Failed to load books");
  //     } finally {
  //       setBooksLoading(false);
  //     }
  //   }
  //   fetchBooks();
  // }, []);

  // useEffect(() => {
  //   async function fetchSubscriptions() {
  //     if (!user) return;
  //     try {
  //       const res = await axios.get(`/api/user-subscriptions?uid=${user.uid}`);
  //       const subMap = {};
  //       res.data.forEach((id) => (subMap[id] = true));
  //       setSubscribed(subMap);
  //     } catch (e) {
  //       // ignore
  //     }
  //   }
  //   fetchSubscriptions();
  // }, [user]);

  // useEffect(() => {
  //   async function fetchMcqCount() {
  //     if (!user) return;
  //     try {
  //       // Prefer server-side (admin) endpoint to read mcq count securely
  //       try {
  //         const idToken = await user.getIdToken();
  //         const res = await fetch("/api/get-mcq-count", {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${idToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         const json = await res.json();
  //         if (res.ok && json.ok) {
  //           setMcqCount(json.count || 0);
  //           return;
  //         }
  //       } catch (e) {
  //         // If server endpoint fails, fall back to client Firestore read
  //         console.warn(
  //           "get-mcq-count endpoint failed, falling back to client read",
  //           e
  //         );
  //       }

  //       const ref = doc(db, "mcq_count", user.uid);
  //       const snap = await getDoc(ref);
  //       if (snap.exists()) {
  //         const data = snap.data();
  //         setMcqCount(data.count || 0);
  //       } else {
  //         setMcqCount(0);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch mcq count:", err);
  //     }
  //   }
  //   fetchMcqCount();
  // }, [user]);

  // Combined loading: either auth or books
  if (authLoading ) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-50/30 via-purple-50/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-indigo-50/30 via-pink-50/20 to-transparent"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Loading Dashboard
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch your information...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50/30 via-slate-50/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-gray-50/30 via-slate-50/20 to-transparent"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Not Signed In
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view your dashboard
          </p>
          <button
            onClick={() => (window.location.href = "/signin")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (authError ) {
    return (
      <div className="p-8 text-center text-red-600">
        {authError?.message}
      </div>
    );
  }

  // Filter books to only those the user is subscribed to
  // const subscribedBooks = books.filter((book) => subscribed[book.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile card (moved from profile page) */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full mb-6 transform transition-all duration-500 hover:shadow-3xl">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-0 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
                  {user.displayName || "Your Profile"}
                </h2>
                <p className="text-gray-600">
                  Account information and settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-md shadow-sm text-sm text-slate-700">
                {/* MCQs practiced:{" "} */}
                {/* <span className="font-semibold">{mcqCount}</span> */}
              </div>
              <Link href="/settings">
                <div className="w-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </div>
              </Link>
              <button
                onClick={() => auth.signOut()}
                className="w-36 bg-white border-2 border-red-200 text-red-600 py-2 px-4 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-sm"
              >
                <span className="flex items-center justify-center">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-gray-200/50 rounded-xl p-4 group hover:shadow-md transition-all duration-300 text-center">
              <div className="flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-700">
                  Email Address
                </span>
              </div>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>

            {user.displayName && (
              <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-gray-200/50 rounded-xl p-4 group hover:shadow-md transition-all duration-300 text-center">
                <div className="flex items-center justify-center mb-2">
                  <User className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-gray-700">Full Name</span>
                </div>
                <p className="text-gray-800 font-medium">{user.displayName}</p>
              </div>
            )}

            <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-gray-200/50 rounded-xl p-4 group hover:shadow-md transition-all duration-300 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="font-semibold text-gray-700">
                  Account Status
                </span>
              </div>
              <p className="text-green-700 font-medium">✅ Verified & Active</p>
            </div>
          </div>
        </div>

        {/* <h1 className="text-3xl font-bold mb-6 text-emerald-800">
          Your Subscribed Notes
        </h1>
        <div className="mb-6 flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-md shadow-sm text-sm text-slate-700">
            MCQs practiced: <span className="font-semibold">{mcqCount}</span>
          </div>
        </div>
        {subscribedBooks.length === 0 ? (
          <div className="text-center text-gray-500">
            You have not subscribed to any notes yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subscribedBooks.map((note) => (
              <Link key={note.id} href={`/book/${note.id}/1`}>
                <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition cursor-pointer">
                  <h2 className="font-semibold text-lg text-emerald-900 mb-2 line-clamp-2">
                    {note.book_name}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {note.description || "No description"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
