"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "@firebase/firestore";
import { useRouter } from "next/navigation";
import { Loader, Book, Clock, MapPin, GraduationCap, Info } from "lucide-react";

const SUBJECTS = {
  "1-5": ["All Subjects", "English", "Mathematics", "Science"],
  "6-8": ["Mathematics", "Science", "English", "Social Studies"],
  "9-10": ["Mathematics", "Science", "English", "Social Studies", "Optional Mathematics"],
  "11-12 Science": ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
  "11-12 Management": ["Accountancy", "Business Studies", "Economics", "Mathematics", "Computer Science"],
  "11-12 Humanities": ["History", "Geography", "Political Science", "Sociology", "Economics"],
};

export default function RequestTutor() {
  const [user, loading] = useAuthState(auth);
  const [formData, setFormData] = useState({
    grade: "",
    subjects: [],
    preferredTime: "",
    location: "",
    additionalInfo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/signin");
      return;
    }

    try {
      setSubmitting(true);
      
      // Create tuition request
      const docRef = await addDoc(collection(db, "tuitionRequests"), {
        ...formData,
        studentId: user.uid,
        studentName: user.displayName,
        studentEmail: user.email,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // Create vacancy post
      await addDoc(collection(db, "vacancies"), {
        requestId: docRef.id,
        grade: formData.grade,
        subjects: formData.subjects,
        location: formData.location,
        status: "open",
        createdAt: serverTimestamp(),
      });

      router.push("/dashboard?request=success");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Home Tutor</h1>
          <p className="text-gray-600">Fill in your requirements and we'll find the perfect tutor for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              {/* Grade Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level
                </label>
                <select
                  required
                  value={formData.grade}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      grade: e.target.value,
                      subjects: [] // Reset subjects when grade changes
                    });
                  }}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Grade</option>
                  {Object.keys(SUBJECTS).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Selection */}
              {formData.grade && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects Needed
                  </label>
                  <div className="space-y-2">
                    {SUBJECTS[formData.grade].map((subject) => (
                      <label key={subject} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(subject)}
                          onChange={(e) => {
                            const subjects = e.target.checked
                              ? [...formData.subjects, subject]
                              : formData.subjects.filter((s) => s !== subject);
                            setFormData({ ...formData, subjects });
                          }}
                          className="rounded text-blue-600"
                        />
                        <span className="text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  required
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (6 AM - 10 AM)</option>
                  <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your area/locality"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Any specific requirements or information..."
                  rows={4}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !user}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>

              {!user && (
                <p className="text-sm text-center text-gray-600">
                  Please <a href="/signin" className="text-blue-600 hover:underline">sign in</a> to submit a request
                </p>
              )}
            </form>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Submit Request</h4>
                    <p className="text-sm text-gray-600">Fill in your requirements and preferences</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Match with Tutors</h4>
                    <p className="text-sm text-gray-600">We'll find qualified tutors in your area</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Schedule Classes</h4>
                    <p className="text-sm text-gray-600">Start your learning journey at your convenience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Verified & qualified tutors</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Personalized learning plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Competitive rates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}