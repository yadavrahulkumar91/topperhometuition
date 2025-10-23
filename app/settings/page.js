// "use client";
// import React, { useState } from "react";
// import { auth } from "../firebase/config";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { updateProfile, updatePassword } from "firebase/auth";

// export default function Settings() {
//   const [user, loading, error] = useAuthState(auth);
//   const [displayName, setDisplayName] = useState(user?.displayName || "");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [updating, setUpdating] = useState(false);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-red-500">Error: {error.message}</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-lg">You are not signed in.</p>
//       </div>
//     );
//   }

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setErrorMsg("");
//     setUpdating(true);
//     try {
//       await updateProfile(user, { displayName });
//       setMessage("Display name updated successfully.");
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//     setUpdating(false);
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setErrorMsg("");
//     if (newPassword !== confirmPassword) {
//       setErrorMsg("Passwords do not match");
//       return;
//     }
//     setUpdating(true);
//     try {
//       await updatePassword(user, newPassword);
//       setMessage("Password updated successfully.");
//       setNewPassword("");
//       setConfirmPassword("");
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//     setUpdating(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
//         <form onSubmit={handleUpdateProfile} className="mb-6">
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Display Name</label>
//             <input
//               type="text"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               disabled={updating}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
//             disabled={updating}
//           >
//             {updating ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//         <form onSubmit={handleChangePassword} className="mb-6">
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">New Password</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               disabled={updating}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               disabled={updating}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
//             disabled={updating}
//           >
//             {updating ? "Updating..." : "Change Password"}
//           </button>
//         </form>
//         {message && (
//           <p className="text-green-600 mb-2 text-center">{message}</p>
//         )}
//         {errorMsg && (
//           <p className="text-red-500 mb-2 text-center">{errorMsg}</p>
//         )}
//         <button
//           onClick={() => auth.signOut()}
//           className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition mt-2"
//         >
//           Sign Out
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile, updatePassword } from "firebase/auth";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  AlertCircle,
  Loader,
  Sparkles,
  CheckCircle,
  Mail,
  Settings,
} from "lucide-react";

export default function Settings1() {
  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  if (loading) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-50/30 via-purple-50/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-indigo-50/30 via-pink-50/20 to-transparent"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Loading Settings
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch your information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-red-50/30 via-pink-50/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-orange-50/30 via-red-50/20 to-transparent"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Error Occurred
          </h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              {error.message}
            </div>
          </div>
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
            Please sign in to access settings
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");
    setUpdating(true);
    try {
      await updateProfile(user, { displayName });
      setMessage("Display name updated successfully.");
    } catch (err) {
      setErrorMsg(err.message);
    }
    setUpdating(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setUpdating(true);
    try {
      await updatePassword(user, newPassword);
      setMessage("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrorMsg(err.message);
    }
    setUpdating(false);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-50/30 via-purple-50/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-indigo-50/30 via-pink-50/20 to-transparent"></div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gradient-to-r from-pink-100/40 to-indigo-100/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-gray-300 opacity-40" />
          </div>
        ))}
      </div>

      {/* Main settings container */}
      <div
        className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Account Settings
          </h2>
          <p className="text-gray-600">Manage your profile and security</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8 bg-gray-100/80 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeTab === "security"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Security
          </button>
        </div>

        {/* Current User Info */}
        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-gray-200/50 rounded-xl p-4 mb-8">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Signed in as</p>
              <p className="text-gray-800 font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your display name"
                  disabled={updating}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <button
              onClick={handleUpdateProfile}
              disabled={updating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center">
                {updating ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Update Profile
                  </>
                )}
              </span>
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter new password"
                  disabled={updating}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={updating}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Confirm new password"
                  disabled={updating}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={updating}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={updating || !newPassword || !confirmPassword}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center">
                {updating ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Change Password
                  </>
                )}
              </span>
            </button>
          </div>
        )}

        {/* Success/Error Messages */}
        {message && (
          <div className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl animate-fadeIn">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-3" />
              {message}
            </div>
          </div>
        )}
        {errorMsg && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-shake">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" />
              {errorMsg}
            </div>
          </div>
        )}

        {/* Sign Out Button */}
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <button
            onClick={() => auth.signOut()}
            className="w-full bg-white border-2 border-red-200 text-red-600 py-3 px-6 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] group"
          >
            <span className="flex items-center justify-center">
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 0.6;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        /* Enhanced shadows for white theme */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.2);
        }

        /* Mobile-first responsive adjustments */
        @media (max-width: 640px) {
          .rounded-3xl {
            border-radius: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
