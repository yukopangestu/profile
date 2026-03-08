import { FaBuilding } from 'react-icons/fa';
import { experiences } from '@/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-5 bg-blue-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-3">Professional Journey</h2>
        <p className="text-lg text-gray-400 text-center mb-14">My career progression and achievements</p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-blue-200" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="flex gap-6">
                {/* Dot */}
                <div className="flex-shrink-0 w-7 flex justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-700 border-2 border-white shadow ring-2 ring-blue-200 mt-2 z-10" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-3">
                    <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      <FaBuilding size={11} />
                      {exp.company}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
