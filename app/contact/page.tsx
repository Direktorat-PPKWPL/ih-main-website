"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChevronDownIcon, 
  Bars3Icon, 
  XMarkIcon
} from "@heroicons/react/24/outline";

import AccessibilityModal from "../components/AccessibilityModal";
import InteractiveMap from "../components/InteractiveMap";
import "../accessibility.css";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isLayananDropdownOpen, setIsLayananDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLayananOpen, setIsMobileLayananOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isAccessibilityOpen) {
        setIsAccessibilityOpen(false);
      }

      // Alt + A untuk membuka modal aksesibilitas
      if (event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setIsAccessibilityOpen(true);
      }

      // Close dropdown when escape is pressed
      if (event.key === "Escape" && isLayananDropdownOpen) {
        setIsLayananDropdownOpen(false);
      }

      // Close mobile menu when escape is pressed
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsMobileLayananOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAccessibilityOpen, isLayananDropdownOpen, isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.layanan-dropdown')) {
        setIsLayananDropdownOpen(false);
      }
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
        setIsMobileLayananOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile menu close
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileLayananOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi pengiriman form
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general"
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header
          className={`container mx-auto px-6 lg:px-8 py-4 max-w-7xl transition-all duration-1000 relative z-50 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <nav
            className="flex justify-between items-center"
            role="navigation"
            aria-label="Navigasi utama"
          >
            {/* Kiri: Logo */}
            <div className="flex items-center cursor-pointer flex-1">
              <Image
                src="/images/icon/logo.png"
                alt="Logo Kementerian Lingkungan Hidup dan Kehutanan"
                width={150}
                height={56}
                className="h-12 w-auto"
                onClick={() => (window.location.href = "/")}
              />
            </div>

            {/* Tengah: Menu Desktop */}
            <div className="hidden md:flex space-x-6 justify-center flex-1" role="menubar">
              <a
                href="/"
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
                role="menuitem"
              >
                Beranda
              </a>
              <a
                href="/tentang-kami"
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
                role="menuitem"
              >
                Tentang Kami
              </a>
              
              {/* Layanan Dropdown */}
              <div className="relative layanan-dropdown">
                <button
                  onClick={() => setIsLayananDropdownOpen(!isLayananDropdownOpen)}
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-colors text-sm"
                  role="menuitem"
                  aria-expanded={isLayananDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Menu Layanan"
                >
                  Layanan
                  <ChevronDownIcon 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isLayananDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Dropdown Menu */}
                {isLayananDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-[100]"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="py-2">
                      <a
                        href="#article"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        role="menuitem"
                        onClick={() => setIsLayananDropdownOpen(false)}
                      >
                        <div className="font-medium">Article</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Baca artikel terbaru tentang infrastruktur hijau
                        </div>
                      </a>
                      
                      <a
                        href="#pih"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        role="menuitem"
                        onClick={() => setIsLayananDropdownOpen(false)}
                      >
                        <div className="font-medium">Peta Infrastruktur Hijau</div>
                        <div className="text-xs text-gray-500 mt-1">
                            Temukan lokasi proyek infrastruktur hijau
                        </div>
                      </a>
                      
                      <a
                        href="#pengajuan"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        role="menuitem"
                        onClick={() => setIsLayananDropdownOpen(false)}
                      >
                        <div className="font-medium">Pengajuan Infrastruktur Hijau</div>
                        <div className="text-xs text-gray-500 mt-1">
                            Ajukan proyek infrastruktur hijau Anda
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <a
                href="/contact"
                className="text-orange-600 font-medium text-sm"
                role="menuitem"
              >
                Kontak
              </a>
            </div>

            {/* Kanan: Tombol Login Desktop */}
            <div className="hidden md:flex justify-end flex-1">
              <button
              onClick={() => redirect('/login')}
              className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors text-sm min-w-[80px] h-9"
              aria-label="Masuk ke akun"
              >
              Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button p-2 text-gray-600 hover:text-orange-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[90] md:hidden" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[100] md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-semibold text-teal-800">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close mobile menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="space-y-4">
            <a
              href="/"
              className="block py-3 text-gray-700 hover:text-orange-600 transition-colors border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Beranda
            </a>
            <a
              href="/tentang-kami"
              className="block py-3 text-gray-700 hover:text-orange-600 transition-colors border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Tentang Kami
            </a>

            {/* Mobile Layanan Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => setIsMobileLayananOpen(!isMobileLayananOpen)}
                className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Layanan
                <ChevronDownIcon 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMobileLayananOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {isMobileLayananOpen && (
                <div className="pl-4 pb-3 space-y-2">
                  <a
                    href="#article"
                    className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="font-medium">Article</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Baca artikel terbaru tentang infrastruktur hijau
                    </div>
                  </a>
                  
                  <a
                    href="#pih"
                    className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="font-medium">Peta Infrastruktur Hijau</div>
                    <div className="text-xs text-gray-500 mt-1">
                        Temukan lokasi proyek infrastruktur hijau
                    </div>
                  </a>

                  <a
                    href="#pengajuan"
                    className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="font-medium">Pengajuan Infrastruktur Hijau</div>
                    <div className="text-xs text-gray-500 mt-1">
                        Ajukan proyek infrastruktur hijau Anda
                    </div>
                  </a>
                </div>
              )}
            </div>
            
            <a
              href="/contact"
              className="block py-3 text-orange-600 font-medium border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Kontak
            </a>

            {/* Mobile Login Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  closeMobileMenu();
                  redirect('/login');
                }}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-full hover:bg-orange-700 transition-colors"
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Accessibility Modal */}
      <AccessibilityModal 
        isOpen={isAccessibilityOpen} 
        onClose={() => setIsAccessibilityOpen(false)} 
      />

      {/* Hero Section */}
      <section className="bg-teal-800 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hubungi Kami
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Kami siap membantu Anda dengan pertanyaan, konsultasi, atau informasi 
            mengenai infrastruktur hijau di Indonesia.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Alamat */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Alamat Kantor</h3>
              <p className="text-gray-600 text-sm">
                Jl. DI Panjaitan Kav.24<br />
                Kebon Nanas, Jakarta Timur<br />
                13410, Indonesia
              </p>
            </div>

            {/* Telepon */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Telepon</h3>
              <p className="text-gray-600 text-sm">
                (021) 8580101<br />
                (021) 8580103<br />
                Fax: (021) 8580102
              </p>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                info@kemenlh.go.id<br />
                infrastruktur@kemenlh.go.id<br />
                humas@kemenlh.go.id
              </p>
            </div>

            {/* Jam Operasional */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Jam Operasional</h3>
              <p className="text-gray-600 text-sm">
                Senin - Jumat<br />
                08:00 - 16:00 WIB<br />
                Sabtu-Minggu: Tutup
              </p>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="space-y-12">
            {/* Map Section - Full Width & Centered */}
            <div className="w-full max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-teal-800 mb-6 text-center">Lokasi Kantor Kami</h3>
                <div className="w-full">
                  <InteractiveMap
                    latitude={-6.2328521}
                    longitude={106.795047}
                    title="Kementerian Lingkungan Hidup dan Kehutanan"
                    description="Jl. DI Panjaitan Kav.24, Kebon Nanas, Jakarta Timur 13410"
                    height="500px"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    📍 Jl. DI Panjaitan Kav.24, Kebon Nanas, Jakarta Timur 13410, Indonesia
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Klik pada marker untuk informasi lebih detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-white py-6 transition-all duration-1000 delay-1200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} role="contentinfo">
              <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-4 md:space-y-0">
                  {/* Left Side - Government Info */}
                  <div className="flex items-center space-x-3">
                    <Image 
                      src="https://res.cloudinary.com/dwm0tvqar/image/upload/v1752906404/klh_logo.png" 
                      alt="Logo Kementerian Lingkungan Hidup dan Kehutanan Republik Indonesia" 
                      width={80} 
                      height={30}
                      className="h-16 w-auto flex-shrink-0"
                    />
                    <div className="text-gray-600">
                      <h4 className="text-sm font-medium text-teal-800">
                        Kementerian Lingkungan Hidup/
                      </h4>
                      <h4 className="text-sm font-medium text-teal-800">
                        Badan Pengendalian Lingkungan Hidup
                      </h4>
                      <h4 className="text-sm font-medium text-teal-800">
                        Republik Indonesia
                      </h4>
                      <address className="text-xs text-gray-500 not-italic">
                        Jl. DI Panjaitan Kav.24, Kebon nanas, Jakarta Timur 13410.
                      </address>
                      <p className="text-xs text-gray-500">
                        Telepon. (021)8580101/(021)8580103 Website: www.kemenlh.go.id
                      </p>
                    </div>
                  </div>
      
                  {/* Right Side - Kontak Kami */}
                  <div className="flex flex-col items-center md:items-end">
                    <h4 className="text-lg font-semibold text-teal-800 mb-3">
                      Kontak Kami
                    </h4>
                    <div className="flex space-x-4" role="list" aria-label="Media sosial">
                      {/* Instagram */}
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                        aria-label="Kunjungi halaman Instagram kami"
                        role="listitem"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
      
                      {/* YouTube */}
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                        aria-label="Kunjungi channel YouTube kami"
                        role="listitem"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
      
                      {/* Twitter/X */}
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                        aria-label="Kunjungi halaman Twitter kami"
                        role="listitem"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
      
                      {/* Facebook */}
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                        aria-label="Kunjungi halaman Facebook kami"
                        role="listitem"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
}
