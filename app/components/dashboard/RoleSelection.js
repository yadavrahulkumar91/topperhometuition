"use client";
import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import db from "@firebase/firestore";
import { useRouter } from "next/navigation";

export default function RoleSelection({ user, onRoleSelect }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleSelect = async (chosen) => {
    if (!user) return;
    try {
      setLoading(true);
      const base = {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      };

      // Write to specific collection and users collection
      if (chosen === "tutor") {
        await setDoc(doc(db, "tutors", user.uid), base);
      } else {
        await setDoc(doc(db, "students", user.uid), base);
      }

      await setDoc(doc(db, "users", user.uid), { role: chosen, ...base });
      onRoleSelect?.(chosen);

      // Navigate to profile completion
      router.push(`/${chosen}-profile`);
    } catch (e) {
      console.error("Failed to set role:", e);
      alert("Failed to set role: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 shadow-2xl w-full mb-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Complete your profile</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose your role to continue setting up your profile.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleRoleSelect("tutor")}
            disabled={loading}
            className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <h4 className="font-semibold text-blue-600 mb-2">I am a Tutor</h4>
            <p className="text-sm text-gray-600">
              Create your tutor profile and connect with students looking for
              guidance.
            </p>
          </button>
          <button
            onClick={() => handleRoleSelect("student")}
            disabled={loading}
            className="p-6 border-2 border-green-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
          >
            <h4 className="font-semibold text-green-600 mb-2">
              I am a Student / Parent
            </h4>
            <p className="text-sm text-gray-600">
              Find qualified tutors and get help with your studies.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}