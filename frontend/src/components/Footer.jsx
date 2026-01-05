import React from 'react';
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin, Mail, Zap } from 'lucide-react';
import nutrivigile from "../assets/nutrivigile.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer navigation data
  const footerLinks = {
    product: [
      { name: 'AI Scanner', href: '#' },
      { name: 'Nutrition Decoded', href: '#' },
      { name: 'Safety Signals', href: '#' },
      { name: 'Health Profile', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Mission', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ]
  };

  return (
    <footer className="relative bg-[#05050A] text-gray-300 pt-20 pb-10 overflow-hidden border-t border-white/5">

      {/* 1. Ambient Background Glow (Matches your Hero Section) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={nutrivigile}
                alt="NutriVigil Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-lg shadow-indigo-500/20"
              />
              <span className="text-2xl font-bold text-white tracking-tight">NutriVigil</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your Personal AI Health Scanner. Instantly analyze meals with Gemini v2.5 to keep your nutrition aligned with your health goals.
            </p>

            {/* Tech Stack Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300">
              <Zap className="w-3 h-3 fill-current" />
              <span>Powered by Gemini AI</span>
            </div>
          </div>

          {/* Links Columns - Mapped dynamically */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-indigo-400 transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-indigo-400 transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4">Stay Healthy</h3>
            <p className="text-sm text-gray-400 mb-4">Join our newsletter for the latest AI nutrition tips.</p>
            <form className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-xs text-gray-500">
            <p>© {currentYear} NutriVigil. All rights reserved.</p>
            <div className="flex gap-4">
              {footerLinks.legal.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-gray-300 transition-colors">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Twitter className="w-5 h-5" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Instagram className="w-5 h-5" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;