'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCode, FaMapMarkerAlt, FaEnvelope, FaFolder } from 'react-icons/fa';

const FULL_NAME = 'Yuko Pangestu';
const BARCODE_BARS = [3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2];

export default function HeroSection() {
  const [displayName, setDisplayName] = useState('');
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayName(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) {
        clearInterval(timer);
        setTyped(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-blue-50 flex items-center justify-center pt-16 pb-12 px-5"
    >
      <div className="flex flex-col items-center animate-fade-in-up">
        {/* Lanyard */}
        <div className="flex flex-col items-center">
          <div className="w-px h-9 bg-blue-800 opacity-40" />
          <div className="w-3 h-2 border-b-2 border-l-2 border-r-2 border-blue-800 opacity-40 rounded-b" />
        </div>

        {/* ID Card */}
        <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
          {/* Card header */}
          <div className="bg-blue-900 flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2.5 text-blue-400 text-base font-medium">
              <FaCode size={16} />
              <span>Personal Profile</span>
            </div>
            <span className="text-white/40 text-sm">ID #YP-001</span>
          </div>

          {/* Card body */}
          <div className="flex gap-8 p-8">
            {/* Photo column */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="w-44 h-56 rounded-xl overflow-hidden border-2 border-blue-100">
                <Image
                  src="/hero_img.jpg"
                  alt="Yuko Pangestu"
                  width={176}
                  height={224}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 text-xs font-bold tracking-widest">ACTIVE</span>
              </div>
            </div>

            {/* Info column */}
            <div className="flex-1 min-w-0 py-1">
              <h1 className="text-2xl font-bold text-blue-900 mb-1 h-9">
                {displayName}
                {!typed && <span className="animate-blink">|</span>}
              </h1>
              <p className="text-base font-semibold text-blue-700 mb-1">Technical Lead</p>
              <p className="text-sm text-gray-400 mb-4">Software Engineering</p>
              <hr className="border-gray-100 mb-4" />
              <div className="flex items-center gap-2.5 mb-3">
                <FaMapMarkerAlt size={13} className="text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-500">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-2.5 mb-5">
                <FaEnvelope size={13} className="text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-500">yuko.pangestu@gmail.com</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Go', 'PHP', 'Vue.js', 'MySQL'].map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-md border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div className="border-t border-gray-100 px-8 py-5 flex items-center justify-between">
            {/* Barcode */}
            <div className="flex flex-col items-center">
              <div className="flex items-end h-8 mb-2 gap-px">
                {BARCODE_BARS.map((w, i) => (
                  <div
                    key={i}
                    style={{ width: w * 2.5 }}
                    className="h-full bg-gray-700 opacity-60"
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-300 tracking-widest">YP · 2024 · SOFTWARE ENGINEERS</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-2 bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaEnvelope size={13} />
                Contact
              </button>
              <button
                onClick={() => scrollTo('#portfolio')}
                className="flex items-center gap-2 border border-blue-800 text-blue-800 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 hover:text-white transition-colors"
              >
                <FaFolder size={13} />
                Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
