import TerminalChrome from './TerminalChrome';

const metrics = [
  { value: '$2M+', label: 'daily transactions' },
  { value: '10M+', label: 'monthly transactions' },
  { value: '40%', label: 'faster deployments' },
  { value: '35%', label: 'fewer bugs' },
];

const stats = [
  { value: '20+', label: 'projects delivered' },
  { value: '15+', label: 'engineers led' },
  { value: '99.9%', label: 'uptime goal' },
];

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-term-dim">
      <div className="max-w-content mx-auto px-5 sm:px-6 md:px-14 py-14 sm:py-16 md:py-[88px]">
        <div className="section-label">// the philosophy</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="min-w-0">
            <h2 className="m-0 mb-5 sm:mb-[26px] text-[28px] sm:text-[32px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.02em]">
              Precision in Code,
              <br />
              Vision in Strategy
              <span className="text-terminal-primary">.</span>
            </h2>
            <p className="m-0 mb-[18px] text-[15px] sm:text-[15.5px] leading-[1.7] text-terminal-muted">
              As a Technical Lead, I orchestrate development of innovative solutions while mentoring
              engineers. My approach combines backend architecture expertise with strong leadership
              to deliver products that make a difference.
            </p>
            <p className="m-0 text-[15px] sm:text-[15.5px] leading-[1.7] text-terminal-muted">
              I specialize in creating scalable web applications, implementing microservices
              architectures, and ensuring code quality across teams. I also help product teams
              calculate effort and shape solutions for what they want to build.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8 md:gap-11 mt-8 sm:mt-[38px]">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-[26px] sm:text-[34px] font-bold text-terminal-blue">{value}</div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-terminal-faint mt-1 leading-snug">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-terminal-surface border border-term rounded-[10px] overflow-hidden self-start w-full min-w-0">
            <TerminalChrome title="current --status" size="sm" />
            <div className="px-4 sm:px-6 py-5 sm:py-[26px]">
              <div className="font-mono text-[11.5px] text-terminal-faint mb-1.5">currently at</div>
              <div className="text-[20px] sm:text-[22px] font-bold">Sobat Bisnis Group</div>
              <div className="font-mono text-[11px] sm:text-xs text-terminal-blue mt-1 mb-5 sm:mb-6">
                senior full stack developer — java · angularjs · hybrid
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {metrics.map(({ value, label }) => (
                  <div key={label} className="border border-term rounded-md p-3 sm:p-4 min-w-0">
                    <div className="text-xl sm:text-2xl font-bold text-terminal-blue">{value}</div>
                    <div className="font-mono text-[10px] sm:text-[10.5px] text-terminal-faint mt-1 leading-snug break-words">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
