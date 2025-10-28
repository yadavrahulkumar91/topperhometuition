// app/page.js

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Facebook from "./components/facebook";
import WhatsApp from "./components/whatsapp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Excel in Your Studies with Expert Home Tutors
              </h1>
              {/* <Facebook/>
              <WhatsApp/> */}
              <p className="text-xl mb-8 text-blue-100">
                Personalized one-on-one tuition for all subjects and grades.
                Transform your academic journey with Topper Home Tuition Center.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/request-tutor"
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Request Home Tutor
                </Link>
                <Link
                  href="/request-tutor"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
                >Contact through Messenger</Link>
                <Link
                  href="/request-tutor"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
                >Contact through WhatsApp</Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center space-y-6">
                  <div className="bg-white/20 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                    <span className="text-6xl">📚</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">500+</p>
                    <p className="text-blue-100">Happy Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Topper Home Tuition?
            </h2>
            <p className="text-xl text-gray-600">
              We provide excellence in every aspect of home tuition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Expert Tutors
              </h3>
              <p className="text-gray-600">
                Highly qualified and experienced teachers dedicated to your
                success
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Home Comfort
              </h3>
              <p className="text-gray-600">
                Learn in the comfort of your home with flexible scheduling
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Proven Results
              </h3>
              <p className="text-gray-600">
                Track record of improving grades and building confidence
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Affordable Rates
              </h3>
              <p className="text-gray-600">
                Quality education at competitive prices with no hidden costs
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Personalized Approach
              </h3>
              <p className="text-gray-600">
                Customized lesson plans tailored to each student's needs
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Flexible Timing
              </h3>
              <p className="text-gray-600">
                Choose schedules that work best for your family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Subjects We Cover
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tuition for all major subjects
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { subject: "Mathematics", icon: "🔢", color: "blue" },
              { subject: "Science", icon: "🔬", color: "green" },
              { subject: "English", icon: "📖", color: "purple" },
              { subject: "Social Studies", icon: "🌍", color: "orange" },
              { subject: "Computer", icon: "💻", color: "indigo" },
              { subject: "Nepali", icon: "🇳🇵", color: "red" },
              { subject: "Accounts", icon: "📊", color: "teal" },
              { subject: "Economics", icon: "📈", color: "pink" },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center border-t-4 border-${item.color}-500`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.subject}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl text-blue-100">Students Taught</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl text-blue-100">Expert Tutors</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-xl text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5+</div>
              <div className="text-xl text-blue-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Parents Say
            </h2>
            <p className="text-xl text-gray-600">
              Success stories from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "My son's grades improved dramatically within 3 months. The
                personalized attention makes all the difference!"
              </p>
              <p className="font-semibold text-gray-800">- Mrs. Sharma</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Professional tutors who truly care about student progress.
                Highly recommended!"
              </p>
              <p className="font-semibold text-gray-800">- Mr. Thapa</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Flexible timings and affordable rates. My daughter loves her
                tutor!"
              </p>
              <p className="font-semibold text-gray-800">- Mrs. Poudel</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of students achieving academic excellence with Topper
            Home Tuition
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-700 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all text-lg shadow-xl"
            >
              Contact Us Today
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
