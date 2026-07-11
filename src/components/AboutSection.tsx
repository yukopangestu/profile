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
      <div className="max-w-content mx-auto px-6 md:px-14 py-16 md:py-[88px]">
        <div className="section-label">// the philosophy</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="m-0 mb-[26px] text-[32px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.02em]">
              Precision in Code,
              <br />
              Vision in Strategy
              <span className="text-terminal-primary">.</span>
            </h2>
            <p className="m-0 mb-[18px] text-[15.5px] leading-[1.7] text-terminal-muted">
              As a Technical Lead, I orchestrate development of innovative solutions while mentoring
              engineers. My approach combines backend architecture expertise with strong leadership
              to deliver products that make a difference.
            </p>
            <p className="m-0 text-[15.5px] leading-[1.7] text-terminal-muted">
              I specialize in creating scalable web applications, implementing microservices
              architectures, and ensuring code quality across teams. I also help product teams
              calculate effort and shape solutions for what they want to build.
            </p>

            <div className="flex flex-wrap gap-8 md:gap-11 mt-[38px]">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-[34px] font-bold text-terminal-blue">{value}</div>
                  <div className="font-mono text-[11px] text-terminal-faint mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-terminal-surface border border-term rounded-[10px] overflow-hidden self-start">
            <TerminalChrome title="current --status" size="sm" />
            <div className="px-6 py-[26px]">
              <div className="font-mono text-[11.5px] text-terminal-faint mb-1.5">currently at</div>
              <div className="text-[22px] font-bold">B2B Fintech</div>
              <div className="font-mono text-xs text-terminal-blue mt-1 mb-6">
                technical lead — software engineering
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {metrics.map(({ value, label }) => (
                  <div key={label} className="border border-term rounded-md p-4">
                    <div className="text-2xl font-bold text-terminal-blue">{value}</div>
                    <div className="font-mono text-[10.5px] text-terminal-faint mt-1">{label}</div>
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
