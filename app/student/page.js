"use client";
import React, { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStudents() {
      try {
        const snap = await getDocs(collection(db, "students"));
        const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) setStudents(arr);
      } catch (e) {
        console.error("Failed to load students:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStudents();
    return () => (mounted = false);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Students / Parents</h1>
        {loading ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p>No students yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((s) => (
              <div key={s.id} className="p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                    {s.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.photoURL} alt="avatar" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <div className="font-semibold">{s.displayName || "Untitled"}</div>
                    <div className="text-sm text-gray-600">{s.email}</div>
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
