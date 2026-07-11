import { experiences } from '@/data';

const recentRoles = experiences.slice(0, 4);
const earlierRoles = experiences.slice(4);

export default function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-term-dim bg-terminal-alt">
      <div className="max-w-content mx-auto px-6 md:px-14 py-16 md:py-[88px]">
        <div className="section-label">// professional journey</div>
        <h2 className="m-0 mb-4 max-w-[720px] text-[32px] md:text-[44px] font-bold leading-[1.12] tracking-[-0.02em]">
          Precision in Code.
          <br />
          Authority in Leadership.
        </h2>
        <p className="m-0 mb-12 md:mb-[52px] max-w-[600px] text-[15.5px] leading-[1.65] text-terminal-dim">
          8+ years of engineering high-performance systems and leading cross-functional teams to
          deliver scalable digital architectures.
        </p>

        <div className="flex flex-col">
          {recentRoles.map((exp, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-10 py-8 md:py-9 border-t border-term-dim"
            >
              <div>
                <div className="font-mono text-xs text-terminal-blue">{exp.period}</div>
                <div className="text-[21px] font-bold mt-2">{exp.role}</div>
                <div className="font-mono text-[12.5px] text-terminal-faint mt-1">
                  @ {exp.company}
                </div>
              </div>
              <div className="flex flex-col gap-[11px]">
                {exp.achievements.map((item, j) => (
                  <div
                    key={j}
                    className="flex gap-3 items-baseline text-[14.5px] leading-[1.6] text-terminal-muted"
                  >
                    <span className="font-mono text-terminal-primary text-xs shrink-0">▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Earlier roles */}
        <div className="border-t border-term-dim pt-9">
          <div className="font-mono text-xs text-terminal-faint mb-5">
            2016 — 2018 · earlier roles
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {earlierRoles.map((exp, i) => (
              <div key={i} className="border border-term rounded-md p-5">
                <div className="font-bold text-[15px]">{exp.role}</div>
                <div className="font-mono text-[11.5px] text-terminal-blue mt-1 mb-2.5">
                  {exp.company} · {exp.period}
                </div>
                <div className="text-[13px] leading-[1.6] text-terminal-dim">
                  {exp.achievements[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[52px]">
          {[
            { value: '8+', label: 'years of experience' },
            { value: '20+', label: 'projects delivered' },
            { value: '10M+', label: 'monthly transactions' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center border border-term rounded-lg py-7 px-4"
            >
              <div className="text-[40px] font-bold text-terminal-blue">{value}</div>
              <div className="font-mono text-[11.5px] text-terminal-faint mt-1.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
