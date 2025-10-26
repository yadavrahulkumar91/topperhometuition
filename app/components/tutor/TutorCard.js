"use client";
import { MapPin, GraduationCap, BookOpen, Clock, Award, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function TutorCard({ tutor }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 flex-shrink-0">
            {tutor.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tutor.photoURL}
                alt={`${tutor.displayName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <GraduationCap size={32} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">
              {tutor.displayName || "Anonymous Tutor"}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <MapPin size={16} />
              <span>{tutor.location || "Location not specified"}</span>
            </div>
            {tutor.qualifications && tutor.qualifications.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tutor.qualifications?.map((qual, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                  >
                    {qual}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Subjects & Grades */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <BookOpen size={16} />
                <span className="font-medium">Subjects</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects?.map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <GraduationCap size={16} />
                <span className="font-medium">Grades</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tutor.grades?.map((grade, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs"
                  >
                    {grade}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience & Availability */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {tutor.experience && (
              <div className="flex items-center gap-2 text-gray-700">
                <Award size={16} />
                <span>{tutor.experience} Years Experience</span>
              </div>
            )}
            {tutor.availability && (
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} />
                <span>{tutor.availability}</span>
              </div>
            )}
          </div>

          {/* About Section */}
          {tutor.about && (
            <div className="pt-2">
              <p className="text-gray-600 text-sm line-clamp-3">
                {tutor.about}
              </p>
            </div>
          )}
        </div>

        {/* Footer with Contact Info and Actions */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="space-y-1">
            {tutor.phone && (
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={14} />
                <span>{tutor.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={14} />
              <span>{tutor.email}</span>
            </div>
          </div>

          <Link
            href={`/tutor/${tutor.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}