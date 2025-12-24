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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                500+
              </div>
              <div className="text-gray-300">Clients Protected</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-pink-400 mb-2">99.9%</div>
              <div className="text-gray-300">Threat Detection</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <div className="text-gray-300">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Why Choose ApniSec?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Industry-leading cybersecurity solutions tailored for your business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Advanced Protection
              </h3>
              <p className="text-gray-300">
                State-of-the-art security measures to protect against
                sophisticated cyber threats and attacks.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/50 transition">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Real-Time Monitoring
              </h3>
              <p className="text-gray-300">
                24/7 continuous monitoring and instant threat detection to keep
                your systems secure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Expert Team
              </h3>
              <p className="text-gray-300">
                Certified security professionals with years of experience in
                cybersecurity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Comprehensive cybersecurity solutions for every business need
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
              <div className="text-5xl mb-4">☁️</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Cloud Security
              </h3>
              <p className="text-gray-300 mb-6">
                Protect your cloud infrastructure with advanced security
                measures, compliance monitoring, and threat detection.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ AWS, Azure, GCP Security</li>
                <li>✓ Cloud Compliance</li>
                <li>✓ Data Encryption</li>
              </ul>
            </div>

            <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Reteam Assessment
              </h3>
              <p className="text-gray-300 mb-6">
                Comprehensive security assessments to identify vulnerabilities
                and strengthen your security posture.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ Risk Assessment</li>
                <li>✓ Security Audits</li>
                <li>✓ Compliance Reports</li>
              </ul>
            </div>

            <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                VAPT Services
              </h3>
              <p className="text-gray-300 mb-6">
                Vulnerability Assessment and Penetration Testing to find and fix
                security weaknesses before attackers do.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ Network Testing</li>
                <li>✓ Web App Testing</li>
                <li>✓ API Security</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of businesses that trust ApniSec for their
            cybersecurity needs
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-white text-purple-900 rounded-lg font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🛡️</span>
                </div>
                <span className="text-xl font-bold text-white">ApniSec</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in cybersecurity excellence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Cloud Security</li>
                <li>Reteam Assessment</li>
                <li>VAPT Services</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 ApniSec. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
