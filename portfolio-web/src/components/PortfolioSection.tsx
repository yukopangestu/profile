'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { portfolioItems } from '@/data';

export default function PortfolioSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + portfolioItems.length) % portfolioItems.length);
  const next = () => setCurrent(i => (i + 1) % portfolioItems.length);

  const item = portfolioItems[current];

  return (
    <section id="portfolio" className="py-20 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-3">Portfolio Showcase</h2>
        <p className="text-lg text-gray-400 text-center mb-14">Featured projects and achievements</p>

        <div className="relative">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
            <span className="inline-block bg-blue-700 text-white text-sm font-semibold px-3 py-1 rounded-md mb-3">
              {item.category}
            </span>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">{item.title}</h3>
            <div className="rounded-xl overflow-hidden mb-5 bg-gray-50">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={300}
                className="w-full object-cover"
              />
            </div>
            <p className="text-base text-gray-500 leading-relaxed">{item.description}</p>
          </div>

          {/* Prev/Next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <FaChevronLeft size={14} className="text-gray-500" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <FaChevronRight size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {portfolioItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-blue-700 w-7' : 'bg-gray-300 w-2.5 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
