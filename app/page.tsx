// app/page.tsx - ApniSec Landing Page

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ApniSec - Your Trusted Cybersecurity Partner",
  description:
    "ApniSec provides comprehensive cybersecurity solutions including Cloud Security, Reteam Assessments, and VAPT services. Protect your digital assets with our expert team.",
  keywords:
    "cybersecurity, cloud security, VAPT, penetration testing, security assessment, ApniSec",
  openGraph: {
    title: "ApniSec - Your Trusted Cybersecurity Partner",
    description: "Comprehensive cybersecurity solutions for modern businesses",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🛡️</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                ApniSec
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition"
              >
                Features
              </a>
              <a
                href="#services"
                className="text-gray-300 hover:text-white transition"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition"
              >
                About
              </a>
              <Link
                href="/login"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Secure Your Digital
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
              Future Today
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            ApniSec provides enterprise-grade cybersecurity solutions to protect
            your business from evolving threats. Our expert team ensures your
            digital assets remain secure 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <a
              href="#services"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/20 transition"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          © 2025 ApniSec. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
