"use client";
import { useState, useEffect } from 'react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState('none');

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (screenReader) {
      document.documentElement.classList.add('screen-reader-mode');
    } else {
      document.documentElement.classList.remove('screen-reader-mode');
    }
  }, [screenReader]);

  useEffect(() => {
    document.documentElement.setAttribute('data-colorblind', colorBlindMode);
  }, [colorBlindMode]);

  const resetSettings = () => {
    setFontSize(16);
    setHighContrast(false);
    setReduceMotion(false);
    setScreenReader(false);
    setColorBlindMode('none');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-800 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Pengaturan Aksesibilitas
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              aria-label="Tutup dialog aksesibilitas"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Font Size Control */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Ukuran Teks
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="px-3 py-2 bg-teal-100 text-teal-800 rounded hover:bg-teal-200 transition-colors"
                aria-label="Perkecil ukuran teks"
              >
                A-
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="px-3 py-2 bg-teal-100 text-teal-800 rounded hover:bg-teal-200 transition-colors"
                aria-label="Perbesar ukuran teks"
              >
                A+
              </button>
            </div>
          </div>

          {/* Visual Accessibility */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Aksesibilitas Visual
            </h3>
            
            <div className="space-y-4">
              {/* High Contrast */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-gray-700">Mode Kontras Tinggi</span>
              </label>

              {/* Color Blind Support */}
              <div>
                <label className="block text-gray-700 mb-2">Mode Buta Warna:</label>
                <select
                  value={colorBlindMode}
                  onChange={(e) => setColorBlindMode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="none">Normal</option>
                  <option value="protanopia">Protanopia (Merah-Hijau)</option>
                  <option value="deuteranopia">Deuteranopia (Hijau-Merah)</option>
                  <option value="tritanopia">Tritanopia (Biru-Kuning)</option>
                  <option value="monochrome">Monokrom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Motion and Animation */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Gerakan dan Animasi
            </h3>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(e) => setReduceMotion(e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="text-gray-700">Kurangi Animasi dan Gerakan</span>
            </label>
          </div>

          {/* Screen Reader */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Pembaca Layar
            </h3>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={screenReader}
                onChange={(e) => setScreenReader(e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="text-gray-700">Optimasi untuk Pembaca Layar</span>
            </label>
            <p className="text-sm text-gray-600 mt-2">
              Mengoptimalkan navigasi keyboard dan deskripsi elemen untuk pembaca layar.
            </p>
          </div>

          {/* Keyboard Navigation Info */}
          <div className="mb-6 p-4 border rounded-lg bg-blue-50">
            <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Navigasi Keyboard
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Tab:</strong> Pindah ke elemen berikutnya</p>
              <p><strong>Shift + Tab:</strong> Pindah ke elemen sebelumnya</p>
              <p><strong>Enter/Space:</strong> Aktivasi tombol atau link</p>
              <p><strong>Esc:</strong> Tutup dialog atau popup</p>
              <p><strong>Arrow Keys:</strong> Navigasi dalam menu</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              onClick={resetSettings}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Reset Semua
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
            >
              Terapkan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}