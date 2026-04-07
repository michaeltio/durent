"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";

const Header = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-bg/95 backdrop-blur-md border-b border-accent/20 shadow-lg"
          : "bg-transparent border-b border-gray-800/30"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand - Clean and Simple */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="/logo.png"
                alt="DuRent Support Logo"
                className="w-12 h-12 object-contain"
              />
            </div>

            <div>
              <h1 className="font-bold text-2xl text-white tracking-tight">
                <span className="text-white">DuRent</span>
                <span className="text-accent ml-1">Support</span>
              </h1>
              <p className="text-gray-400 text-xs">Production Support Rental</p>
            </div>
          </div>

          {/* Desktop CTA - Simplified */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://app.durentsupport.com"
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mulai Sewa
            </a>
            <button
              onClick={onContactClick}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-card-bg"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4 animate-fade-in-up">
            <a
              href="https://app.durentsupport.com"
              className="mb-3 w-full inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mulai Sewa
            </a>
            <button
              onClick={() => {
                onContactClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hubungi via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
