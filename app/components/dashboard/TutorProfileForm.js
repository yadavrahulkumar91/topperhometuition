"use client";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase/firestore";
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

export default function TutorProfileForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    qualifications: [],
    experience: "",
    grades: [],
    subjects: [],
    locations: "",
    bio: "",
    expectedRate: "",
  });
  const [newQualification, setNewQualification] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, "tutors", user.uid), {
        ...formData,
        updatedAt: new Date().toISOString(),
        profileCompleted: true,
      });

      router.push("/tutor");
    } catch (e) {
      console.error("Failed to update profile:", e);
      alert("Failed to save profile: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Complete Your Tutor Profile</h2>

        {/* Qualifications */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualifications
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="Enter a qualification..."
              />
              <button
                type="button"
                onClick={() => {
                  if (newQualification.trim()) {
                    setFormData({
                      ...formData,
                      qualifications: [...formData.qualifications, newQualification.trim()]
                    });
                    setNewQualification("");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.qualifications.map((qual, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full"
                >
                  <span className="text-sm font-medium">{qual}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        qualifications: formData.qualifications.filter((_, i) => i !== idx)
                      });
                    }}
                    className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-600 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {formData.qualifications.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No qualifications added yet. Add your academic and professional qualifications.
              </p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teaching Experience
          </label>
          <textarea
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Describe your teaching experience..."
            required
          />
        </div>

        {/* Grades */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grades You Can Teach
          </label>
          <div className="grid grid-cols-2 gap-2">
            {GRADES.map((grade) => (
              <label
                key={grade}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={formData.grades.includes(grade)}
                  onChange={(e) => {
                    const newGrades = e.target.checked
                      ? [...formData.grades, grade]
                      : formData.grades.filter((g) => g !== grade);
                    setFormData({ ...formData, grades: newGrades });
                  }}
                  className="rounded text-blue-600"
                />
                <span>{grade}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subjects - Dynamic based on selected grades */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subjects You Can Teach
          </label>
          <div className="grid grid-cols-3 gap-2">
            {formData.grades.flatMap((grade) =>
              SUBJECTS[grade].map((subject) => (
                <label
                  key={`${grade}-${subject}`}
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
                    className="rounded text-blue-600"
                  />
                  <span>{subject}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Locations
          </label>
          <textarea
            value={formData.locations}
            onChange={(e) =>
              setFormData({ ...formData, locations: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            rows={2}
            placeholder="List areas where you can teach..."
            required
          />
        </div>

        {/* Expected Rate */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Rate (NPR per hour)
          </label>
          <input
            type="text"
            value={formData.expectedRate}
            onChange={(e) =>
              setFormData({ ...formData, expectedRate: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., 500-1000"
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            placeholder="Tell students about yourself..."
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </div>
      </div>
    </form>
  );
}