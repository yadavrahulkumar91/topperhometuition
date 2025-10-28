"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import db from "@firebase/firestore";
import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";

const STEPS = [
  {
    id: "basic",
    title: "Basic Information",
    fields: ["phone", "location", "bio"],
  },
  {
    id: "education",
    title: "Educational Background",
    fields: ["qualifications", "specialization"],
  },
  {
    id: "teaching",
    title: "Teaching Details",
    fields: ["subjects", "grades", "experience", "availability"],
  },
  {
    id: "preferences",
    title: "Teaching Preferences",
    fields: ["teachingStyle", "expectedRate", "travelDistance"],
  },
  {
    id: "documents",
    title: "Documents",
    fields: ["idProof", "qualificationProof", "resume"],
  },
];

export default function TutorOnboarding() {
  const [user, loading] = useAuthState(auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    phone: "",
    location: "",
    bio: "",

    // Education
    qualifications: [],
    specialization: "",

    // Teaching
    subjects: [],
    grades: [],
    experience: "",
    availability: "",

    // Preferences
    teachingStyle: "",
    expectedRate: "",
    travelDistance: "",

    // Documents
    idProof: "",
    qualificationProof: "",
    resume: "",
  });
  const [savedData, setSavedData] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadExistingData() {
      if (!user) return;

      try {
        const docRef = doc(db, "tutors", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(prev => ({...prev, ...data}));
          setSavedData(data);
        }
      } catch (error) {
        console.error("Error loading tutor data:", error);
      }
    }
    loadExistingData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    router.push("/signin?role=tutor");
    return null;
  }

  const currentStepData = STEPS[currentStep];

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      const stepFields = currentStepData.fields;
      const stepData = {};
      stepFields.forEach(field => {
        stepData[field] = formData[field];
      });

      await setDoc(doc(db, "tutors", user.uid), {
        ...formData,
        lastUpdatedStep: currentStep,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      setSavedData(prev => ({...prev, ...stepData}));
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    await handleSave();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/tutor/dashboard");
    }
  };

  const isFieldComplete = (field) => {
    const value = formData[field];
    if (Array.isArray(value)) return value.length > 0;
    return value !== "";
  };

  const renderField = (field) => {
    const value = formData[field];
    const savedValue = savedData?.[field];

    switch (field) {
      case "subjects":
      case "grades":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <select
              multiple
              value={value}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setFormData(prev => ({...prev, [field]: selected}));
              }}
              className="w-full p-2 border rounded-md"
            >
              {/* Add your options here */}
            </select>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setFormData(prev => ({...prev, [field]: e.target.value}))}
              className="w-full p-2 border rounded-md"
            />
            {savedValue && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <Check size={16} /> Saved
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between w-full mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-full h-1 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {currentStepData.title}
          </h2>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {currentStepData.fields.map((field) => (
              <div key={field}>{renderField(field)}</div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Back
            </button>
            <div className="space-x-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {currentStep === STEPS.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}