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
        <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
          {/* Card header */}
          <div className="bg-blue-900 flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-medium">
              <FaCode size={11} />
              <span>Personal Profile</span>
            </div>
            <span className="text-white/40 text-[11px]">ID #YP-001</span>
          </div>

          {/* Card body */}
          <div className="flex gap-4 p-4">
            {/* Photo column */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-blue-100">
                <Image
                  src="/hero_img.jpg"
                  alt="Yuko Pangestu"
                  width={96}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 text-[9px] font-bold tracking-widest">ACTIVE</span>
              </div>
            </div>

            {/* Info column */}
            <div className="flex-1 min-w-0">
              <h1 className="text-[17px] font-bold text-blue-900 mb-0.5 h-7">
                {displayName}
                {!typed && <span className="animate-blink">|</span>}
              </h1>
              <p className="text-[13px] font-semibold text-blue-700 mb-0.5">Technical Lead</p>
              <p className="text-[11px] text-gray-400 mb-2">Software Engineering</p>
              <hr className="border-gray-100 mb-2" />
              <div className="flex items-center gap-1.5 mb-1.5">
                <FaMapMarkerAlt size={9} className="text-blue-400 flex-shrink-0" />
                <span className="text-[10px] text-gray-400">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <FaEnvelope size={9} className="text-blue-400 flex-shrink-0" />
                <span className="text-[10px] text-gray-400 truncate">
                  yuko.pangestu@gmail.com
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['Go', 'PHP', 'Vue.js', 'MySQL'].map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
            {/* Barcode */}
            <div className="flex flex-col items-center">
              <div className="flex items-end h-5 mb-1 gap-px">
                {BARCODE_BARS.map((w, i) => (
                  <div
                    key={i}
                    style={{ width: w * 1.5 }}
                    className="h-full bg-gray-700 opacity-60"
                  />
                ))}
              </div>
              <span className="text-[8px] text-gray-300 tracking-widest">YP · 2024 · PAPER.ID</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-1.5 bg-blue-800 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
              >
                <FaEnvelope size={10} />
                Contact
              </button>
              <button
                onClick={() => scrollTo('#portfolio')}
                className="flex items-center gap-1.5 border border-blue-800 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-800 hover:text-white transition-colors"
              >
                <FaFolder size={10} />
                Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
