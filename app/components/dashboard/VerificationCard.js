"use client";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";

export default function VerificationCard({ user }) {
  const [resendLoading, setResendLoading] = useState(false);

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

  return (
    <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-gray-200/50 rounded-xl p-4 group hover:shadow-md transition-all duration-300 text-center">
      <div className="flex items-center justify-center mb-2">
        <div
          className={`w-3 h-3 ${
            user?.emailVerified ? "bg-green-500" : "bg-yellow-500"
          } rounded-full mr-2 animate-pulse`}
        ></div>
        <span className="font-semibold text-gray-700">Account Status</span>
      </div>
      <p className="text-gray-700 font-medium">
        {user?.emailVerified ? "✅ Verified & Active" : "⚠️ Email not verified"}
      </p>
      {!user?.emailVerified && (
        <div className="mt-3">
          <button
            onClick={resendVerification}
            disabled={resendLoading}
            className="px-3 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
          >
            {resendLoading ? "Sending..." : "Resend verification"}
          </button>
        </div>
      )}
    </div>
  );
}