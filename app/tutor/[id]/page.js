"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "@firebase/firestore";
import { 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  FileText,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";

export default function TutorProfile({ params }) {
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTutor() {
      try {
        const tutorDoc = await getDoc(doc(db, "tutors", params.id));
        if (tutorDoc.exists()) {
          setTutor({ id: tutorDoc.id, ...tutorDoc.data() });
        } else {
          setError("Tutor not found");
        }
      } catch (e) {
        console.error("Error fetching tutor:", e);
        setError("Failed to load tutor profile");
      } finally {
        setLoading(false);
      }
    }
    fetchTutor();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <Link href="/tutor" className="text-blue-600 hover:underline">
            Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 py-4 relative">
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                {tutor.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={tutor.photoURL} 
                    alt={tutor.displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <GraduationCap size={40} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="ml-40">
              <h1 className="text-2xl font-bold text-gray-900">{tutor.displayName}</h1>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                {tutor.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{tutor.location}</span>
                  </div>
                )}
                {tutor.experience && (
                  <div className="flex items-center gap-1">
                    <Award size={16} />
                    <span>{tutor.experience} Years Experience</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            {tutor.about && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">About</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{tutor.about}</p>
              </div>
            )}

            {/* Qualifications */}
            {tutor.qualifications && tutor.qualifications.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Qualifications</h2>
                <div className="space-y-3">
                  {tutor.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <GraduationCap className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teaching Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Teaching Details</h2>
              
              {/* Subjects */}
              {tutor.subjects && tutor.subjects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Grades */}
              {tutor.grades && tutor.grades.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Grade Levels</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.grades.map((grade, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              {tutor.availability && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{tutor.availability}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact and Additional Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <span className="text-gray-600">{tutor.email}</span>
                </div>
                {tutor.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" size={20} />
                    <span className="text-gray-600">{tutor.phone}</span>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href={`/message/${tutor.id}`}
                  className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Tutor
                </Link>
              </div>
            </div>

            {/* Additional Documents */}
            {(tutor.resume || tutor.certificates) && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Documents</h2>
                <div className="space-y-3">
                  {tutor.resume && (
                    <a
                      href={tutor.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-blue-600 hover:text-blue-700"
                    >
                      <FileText size={20} />
                      <span>View Resume</span>
                    </a>
                  )}
                  {tutor.certificates && tutor.certificates.map((cert, idx) => (
                    <a
                      key={idx}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-blue-600 hover:text-blue-700"
                    >
                      <Award size={20} />
                      <span>{cert.name || `Certificate ${idx + 1}`}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}