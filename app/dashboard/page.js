"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import db from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import ProfileCard from "../components/dashboard/ProfileCard";
import VerificationCard from "../components/dashboard/VerificationCard";
import RoleSelection from "../components/dashboard/RoleSelection";
import { User, Mail, LogOut, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [user, authLoading, authError] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function checkRole() {
      if (!user) return setRoleLoading(false);
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!mounted) return;
        if (userDoc.exists()) {
          const data = userDoc.data();
          setRole(data.role || null);
        } else {
          setRole(null);
        }
      } catch (e) {
        console.warn("Failed to read role:", e);
      } finally {
        if (mounted) setRoleLoading(false);
      }
    }
    checkRole();
    return () => {
      mounted = false;
    };
  }, [user]);

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

  // Role selection UI shown if role not set
 const handleRoleSelect = async (chosen) => {
   if (!user) return;
   try {
     setRoleLoading(true);

     const base = {
       uid: user.uid,
       displayName: user.displayName || "",
       email: user.email || "",
       photoURL: user.photoURL || "",
       createdAt: serverTimestamp(),
     };

     if (chosen === "tutor") {
       await setDoc(doc(db, "tutors", user.uid), base);
     } else {
       await setDoc(doc(db, "students", user.uid), base);
     }

     await setDoc(doc(db, "users", user.uid), { role: chosen, ...base });

     // ✅ Call your API to set custom claim
     await fetch("/api/setRole", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ uid: user.uid, role: chosen }),
     });

     // 🔄 Refresh token so the new claim is applied
     await user.getIdToken(true);

     setRole(chosen);
     router.push(`/${chosen}`);
   } catch (e) {
     console.error("Failed to set role:", e);
   } finally {
     setRoleLoading(false);
   }
 };


  const resendVerification = async () => {
    if (!user) return;
    try {
      setResendLoading(true);
      await sendEmailVerification(user);
      alert("Verification email resent. Please check your inbox.");
    } catch (e) {
      console.error(e);
      alert("Failed to resend verification: " + (e.message || e));
    } finally {
      setResendLoading(false);
    }
  };

  // Filter books to only those the user is subscribed to
  // const subscribedBooks = books.filter((book) => subscribed[book.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile section */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full mb-6">
          <ProfileCard user={user} onSignOut={() => auth.signOut()} />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Email */}
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-gray-200/50 rounded-xl p-4 group hover:shadow-md transition-all duration-300 text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="font-semibold text-gray-700">Email Address</span>
              </div>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>

            {/* Name if available */}
            {user.displayName && (
              <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-gray-200/50 rounded-xl p-4 group hover:shadow-md transition-all duration-300 text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="font-semibold text-gray-700">Full Name</span>
                </div>
                <p className="text-gray-800 font-medium">{user.displayName}</p>
              </div>
            )}

            {/* Verification status */}
            <VerificationCard user={user} onResend={resendVerification} resendLoading={resendLoading} />
          </div>
        </div>

        {/* Role selection or status */}
        {!roleLoading && (
          role ? (
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 shadow-2xl w-full mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Role: {role}</h3>
              <p className="text-gray-600 mb-4">Visit your role-specific page to manage your profile and see relevant information.</p>
              <div className="flex gap-4">
                <a
                  href={`/${role}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to {role} Dashboard
                </a>
                <a
                  href={`/${role}-profile`}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Edit {role} Profile
                </a>
              </div>
            </div>
          ) : (
            <RoleSelection user={user} onRoleSelect={handleRoleSelect} />
          )
        )}

        
      </div>
    </div>
  );
}
