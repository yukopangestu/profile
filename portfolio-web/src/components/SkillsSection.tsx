'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FaLaptopCode,
  FaDatabase,
  FaTasks,
  FaUserTie,
  FaCompass,
  FaHandshake,
} from 'react-icons/fa';

const skills = [
  { name: 'Golang & PHP', level: 92, Icon: FaLaptopCode },
  { name: 'MySQL & NoSQL', level: 88, Icon: FaDatabase },
  { name: 'Project Management', level: 86, Icon: FaTasks },
  { name: 'Leadership', level: 95, Icon: FaUserTie },
  { name: 'Architecting', level: 90, Icon: FaCompass },
  { name: 'Teamwork', level: 94, Icon: FaHandshake },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-3">Technical Skills</h2>
        <p className="text-lg text-gray-400 text-center mb-14">
          Technologies and expertise I bring to the table
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {skills.map(({ name, level, Icon }) => (
            <div
              key={name}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <Icon size={36} className="text-blue-700 mx-auto mb-3" />
              <p className="text-base font-semibold text-gray-800 mb-4">{name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-700 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: animated ? `${level}%` : '0%' }}
                />
              </div>
              <span className="text-sm text-gray-400">{level}%</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-blue-900 mb-1">Technical Expertise</p>
          <p className="text-base text-gray-400">8+ years building scalable web applications</p>
        </div>
      </div>
    </section>
  );
}
