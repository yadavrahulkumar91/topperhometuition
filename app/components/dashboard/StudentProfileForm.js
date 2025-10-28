"use client";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "@firebase/firestore";
import { useRouter } from "next/navigation";

const GRADES = [
  "1-5",
  "6-8",
  "9-10",
  "11-12 Science",
  "11-12 Management",
  "11-12 Humanities",
];

const SUBJECTS = {
  "1-5": ["All Subjects", "English", "Mathematics", "Science"],
  "6-8": ["Mathematics", "Science", "English", "Social Studies"],
  "9-10": [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Optional Mathematics",
  ],
  "11-12 Science": [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Computer Science",
  ],
  "11-12 Management": [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Mathematics",
    "Computer Science",
  ],
  "11-12 Humanities": [
    "History",
    "Geography",
    "Political Science",
    "Sociology",
    "Economics",
  ],
};

export default function StudentProfileForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    subjects: [],
    location: "",
    preferredTimes: "",
    additionalInfo: "",
    budget: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, "students", user.uid), {
        ...formData,
        updatedAt: new Date().toISOString(),
        profileCompleted: true,
      });

      router.push("/student");
    } catch (e) {
      console.error("Failed to update profile:", e);
      alert("Failed to save profile: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // Available subjects based on selected grade
  const availableSubjects = formData.grade ? SUBJECTS[formData.grade] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Student Profile Details</h2>

        {/* Student Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student's Name
          </label>
          <input
            type="text"
            value={formData.studentName}
            onChange={(e) =>
              setFormData({ ...formData, studentName: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter student's name"
            required
          />
        </div>

        {/* Grade */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <select
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value, subjects: [] })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Grade</option>
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Subjects */}
        {formData.grade && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects Needed
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSubjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => {
                      const newSubjects = e.target.checked
                        ? [...formData.subjects, subject]
                        : formData.subjects.filter((s) => s !== subject);
                      setFormData({ ...formData, subjects: newSubjects });
                    }}
                    className="rounded text-green-600"
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Your location for tutoring"
            required
          />
        </div>

        {/* Preferred Times */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Timings
          </label>
          <textarea
            value={formData.preferredTimes}
            onChange={(e) =>
              setFormData({ ...formData, preferredTimes: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            rows={2}
            placeholder="e.g., Weekdays evenings, Weekend mornings"
            required
          />
        </div>

        {/* Budget */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget (NPR per hour)
          </label>
          <input
            type="text"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., 500-1000"
            required
          />
        </div>

        {/* Additional Information */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            placeholder="Any special requirements or additional information..."
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </div>
      </div>
    </form>
  );
}