import { experiences } from '@/data';

const recentRoles = experiences.slice(0, 4);
const earlierRoles = experiences.slice(4);

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-8 md:px-12 bg-surface">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="text-primary font-bold text-xs tracking-[0.05em] uppercase mb-4 block">
            Professional Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-[-0.02em] text-on-surface leading-tight max-w-3xl">
            Precision in Code.<br />
            Authority in <span className="text-primary">Leadership.</span>
          </h2>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            8+ years of engineering high-performance systems and leading cross-functional teams to
            deliver scalable digital architectures.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-outline-variant/20 -translate-x-1/2" />

          <div className="space-y-24">
            {recentRoles.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start"
                >
                  {/* Label side */}
                  <div className={`pl-12 md:pl-0 ${isLeft ? 'md:text-right md:pr-10' : 'md:order-2 md:pl-10'}`}>
                    <div
                      className={`flex items-center gap-4 mb-2 ${
                        isLeft ? 'md:justify-end' : ''
                      }`}
                    >
                      {isLeft ? (
                        <>
                          <span className="text-[0.75rem] font-bold tracking-[0.05em] text-on-surface-variant/60 uppercase">
                            {exp.period}
                          </span>
                          <div className="hidden md:block w-12 h-[1px] bg-primary" />
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block w-12 h-[1px] bg-outline-variant/40" />
                          <span className="text-[0.75rem] font-bold tracking-[0.05em] text-on-surface-variant/60 uppercase">
                            {exp.period}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface">{exp.role}</h3>
                    <p className="text-primary font-bold text-lg">{exp.company}</p>
                  </div>

                  {/* Content card */}
                  <div
                    className={`relative bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_48px_rgba(0,20,83,0.06)] hover:-translate-y-1 transition-transform duration-300 ml-12 md:ml-0 ${
                      !isLeft ? 'md:order-1' : ''
                    }`}
                  >
                    {/* Timeline node */}
                    <div
                      className={`absolute top-10 w-4 h-4 rounded-full ring-8 ring-surface z-10 shadow-[0_0_12px_rgba(0,74,198,0.3)] ${
                        i < 2
                          ? 'bg-primary'
                          : 'bg-outline-variant'
                      } ${
                        isLeft
                          ? 'left-[-42px] md:left-[-97px]'
                          : 'left-[-42px] md:left-auto md:right-[-97px]'
                      }`}
                    />

                    <ul className="space-y-4">
                      {exp.achievements.map((item, j) => (
                        <li key={j} className="flex gap-4">
                          <span
                            className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${
                              i === 0 ? 'text-primary' : 'text-outline-variant'
                            }`}
                          >
                            {i === 0 ? 'check_circle' : 'radio_button_checked'}
                          </span>
                          <p className="text-on-surface-variant leading-relaxed text-sm">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* Earlier roles — compact */}
            <div className="relative pl-12 md:pl-0">
              <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full bg-outline-variant/40 ring-8 ring-surface z-10 -translate-x-1/2" />
              <div className="md:ml-[calc(50%+3rem)] max-w-xl">
                <span className="text-[0.75rem] font-bold tracking-[0.05em] text-on-surface-variant/60 uppercase block mb-6">
                  2016 — 2018 · Earlier Roles
                </span>
                <div className="space-y-4">
                  {earlierRoles.map((exp, i) => (
                    <div key={i} className="bg-surface-container-low p-6 rounded-xl">
                      <h4 className="font-bold text-on-surface text-sm">
                        {exp.role} · {exp.company}
                      </h4>
                      <p className="text-on-surface-variant text-sm mt-2 leading-relaxed">
                        {exp.period} · {exp.achievements[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 bg-inverse-surface rounded-xl p-12 md:p-20 text-white">
          <div>
            <h3 className="text-6xl font-black mb-4">8+</h3>
            <p className="text-sm uppercase tracking-widest opacity-60">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-6xl font-black mb-4">20+</h3>
            <p className="text-sm uppercase tracking-widest opacity-60">Projects Delivered</p>
          </div>
          <div>
            <h3 className="text-6xl font-black mb-4">10M+</h3>
            <p className="text-sm uppercase tracking-widest opacity-60">Monthly Transactions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
