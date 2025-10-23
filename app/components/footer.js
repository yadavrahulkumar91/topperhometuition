
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@gamechangeracademyrky",
      icon: "🎥",
      color: "hover:bg-red-500",
      bgColor: "bg-red-500",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100091780968711",
      icon: "📘",
      color: "hover:bg-blue-600",
      bgColor: "bg-blue-600",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      icon: "📸",
      color: "hover:bg-pink-500",
      bgColor: "bg-gradient-to-r from-pink-500 to-purple-600",
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com/GameChangerNp",
      icon: "🐦",
      color: "hover:bg-blue-400",
      bgColor: "bg-blue-400",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/gamechanger-company-59b029273",
      icon: "💼",
      color: "hover:bg-blue-700",
      bgColor: "bg-blue-700",
    },
  ];

  const chatLinks = [
    {
      name: "Messenger",
      url: "fb-messenger://user-thread/rahulkumar.yadav.98622733",
      icon: "💬",
      color: "hover:bg-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/+9779808305830",
      icon: "📱",
      color: "hover:bg-green-500",
      bgColor: "bg-green-500",
    },
    {
      name: "Viber",
      url: "viber://chat?number=+9779808305830",
      icon: "📞",
      color: "hover:bg-purple-500",
      bgColor: "bg-purple-500",
    },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Programs", href: "/programs" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "FAQs", href: "/faq" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-75"></div>
                    <Image
                      src="https://storage.googleapis.com/gamechanger-drive-91.appspot.com/104Asset%208%404x.png"
                      width={50}
                      height={50}
                      alt="GameChanger Academy"
                      className="relative rounded-full border-2 border-white/20"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                      Topper Home Tuition Center
                    </h3>
                    <p className="text-slate-300 text-sm">
                      Transforming Education, Empowering Futures
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  We're dedicated to providing world-class education and
                  empowering students to achieve their dreams through innovative
                  learning experiences and comprehensive support systems.
                </p>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <MapPinIcon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Our Location</p>
                      <p className="text-slate-300 text-sm">
                        Maharajgunj (Behind Teaching Hospital)
                        <br />
                        Kathmandu, Nepal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <PhoneIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Call Us</p>
                      <a
                        href="tel:+9779808305830"
                        className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                      >
                        +977 9808305830
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <EnvelopeIcon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email Us</p>
                      <a
                        href="mailto:gamechanger.com.np@gmail.com"
                        className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                      >
                        gamechanger.com.np@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">
                  Support
                </h4>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-emerald-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Media & Chat Section */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Social Media */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <span className="mr-2">🌟</span>
                    Connect With Us
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-xl hover:scale-110 transition-all duration-300 group-hover:bg-white/20">
                          {social.icon}
                        </div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {social.name}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Chat Options */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <span className="mr-2">💬</span>
                    Chat With Us
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {chatLinks.map((chat) => (
                      <a
                        key={chat.name}
                        href={chat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-xl hover:scale-110 transition-all duration-300 group-hover:bg-white/20">
                          {chat.icon}
                        </div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {chat.name}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-black/20 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300 mb-4 md:mb-0">
                <span>&copy; {currentYear} GameChanger Academy.</span>
                <span>Made with</span>
                <HeartIcon className="h-4 w-4 text-red-400 animate-pulse" />
                <span>in Nepal</span>
              </div>

              <button
                onClick={scrollToTop}
                className="group flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <ArrowUpIcon className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
                <span className="text-slate-300 group-hover:text-white text-sm font-medium">
                  Back to Top
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
