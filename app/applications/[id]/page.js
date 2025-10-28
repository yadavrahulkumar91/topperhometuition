"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "@firebase/firestore";
import { Loader, Check, X, Clock } from "lucide-react";

export default function VacancyApplications({ params }) {
  const [user, loading] = useAuthState(auth);
  const [applications, setApplications] = useState([]);
  const [vacancy, setVacancy] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState("");

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
        const vacancyData = { id: vacancyDoc.id, ...vacancyDoc.data() };
        setVacancy(vacancyData);

        // Check if current user is the vacancy owner
        const requestDoc = await getDoc(doc(db, "requests", vacancyData.requestId));
        setIsOwner(requestDoc.data()?.userId === user.uid);

        // Fetch applications
        const applicationsRef = collection(db, "applications");
        const q = query(applicationsRef, where("vacancyId", "==", params.id));
        const querySnapshot = await getDocs(q);
        
        const applicationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load applications");
      }
    }
    fetchData();
  }, [user, params.id]);

  const handleApplicationStatus = async (applicationId, newStatus) => {
    if (!isOwner) return;

    try {
      await updateDoc(doc(db, "applications", applicationId), {
        status: newStatus
      });

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Failed to update application status");
    }
  };

  if (loading || !vacancy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error}</h2>
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            You don't have permission to view these applications
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Vacancy Details */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Applications</h1>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Grade</p>
                <p className="font-medium text-gray-900">{vacancy.grade}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subjects</p>
                <p className="font-medium text-gray-900">{vacancy.subjects.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{vacancy.location}</p>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qualifications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {application.tutorName}
                        </span>
                        <span className="text-sm text-gray-500">{application.tutorEmail}</span>
                        <span className="text-sm text-gray-500">{application.tutorPhone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="text-sm text-gray-900 list-disc ml-4">
                        {application.tutorQualifications?.map((qual, index) => (
                          <li key={index}>{qual}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {application.tutorExperience}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {application.note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${application.status === "accepted" ? "bg-green-100 text-green-800" :
                          application.status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {application.status === "pending" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApplicationStatus(application.id, "accepted")}
                            className="p-1 rounded-full text-green-600 hover:bg-green-100"
                            title="Accept"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleApplicationStatus(application.id, "rejected")}
                            className="p-1 rounded-full text-red-600 hover:bg-red-100"
                            title="Reject"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No applications yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}