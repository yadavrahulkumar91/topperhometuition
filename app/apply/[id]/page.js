"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "@firebase/firestore";
import { useRouter } from "next/navigation";
import { Loader, AlertCircle } from "lucide-react";

export default function ApplyForVacancy({ params }) {
  const [user, loading] = useAuthState(auth);
  const [vacancy, setVacancy] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [applicationNote, setApplicationNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        // Fetch vacancy details
        const vacancyDoc = await getDoc(doc(db, "vacancies", params.id));
        if (!vacancyDoc.exists()) {
          setError("Vacancy not found");
          return;
        }
        setVacancy({ id: vacancyDoc.id, ...vacancyDoc.data() });

        // Fetch tutor profile
        const tutorDoc = await getDoc(doc(db, "tutors", user.uid));
        if (!tutorDoc.exists()) {
          setError("Please complete your tutor profile first");
          return;
        }
        setTutorProfile({ id: tutorDoc.id, ...tutorDoc.data() });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load required information");
      }
    }
    fetchData();
  }, [user, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !vacancy || !tutorProfile) return;

    try {
      setSubmitting(true);
      // Check if already applied
      const applicationsRef = collection(db, "applications");
      
      // Create application
      await addDoc(applicationsRef, {
        vacancyId: vacancy.id,
        tutorId: user.uid,
        tutorName: tutorProfile.displayName,
        // tutorEmail: tutorProfile.email,
        // tutorPhone: tutorProfile.phone,
        // tutorQualifications: tutorProfile.qualifications || [],
        // tutorExperience: tutorProfile.experience,
        // note: applicationNote,
        // status: "pending",
        // createdAt: serverTimestamp(),
        // requestId: vacancy.requestId,
        // subjects: vacancy.subjects,
        // grade: vacancy.grade,
        // location: vacancy.location
      });

      router.push("/tutor/applications");
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !vacancy || !tutorProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error}</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Vacancy Details */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Apply for Teaching Position</h1>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">Grade:</span> {vacancy.grade}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">Subjects:</span>{" "}
                {vacancy.subjects.join(", ")}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">Location:</span> {vacancy.location}
              </p>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{tutorProfile.displayName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{tutorProfile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{tutorProfile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium text-gray-900">{tutorProfile.experience}</p>
                </div>
              </div>
            </div>

            {/* Application Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why are you a good fit for this position?
              </label>
              <textarea
                value={applicationNote}
                onChange={(e) => setApplicationNote(e.target.value)}
                rows={4}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your relevant experience and why you'd be a great tutor for this student..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}