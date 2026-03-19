const metrics = [
  { value: '$2M+', label: 'Daily Transactions' },
  { value: '10M+', label: 'Monthly Transactions' },
  { value: '40%', label: 'Faster Deployments' },
  { value: '35%', label: 'Fewer Bugs' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-8 md:px-12 bg-surface overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* Text side */}
        <div className="lg:w-1/2">
          <span className="text-primary font-bold text-xs tracking-[0.05em] uppercase mb-4 block">
            The Philosophy
          </span>
          <h2 className="text-on-surface font-black text-4xl tracking-tight mb-8">
            Precision in Code,<br />Vision in Strategy.
          </h2>
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            <p>
              As a Technical Lead, I orchestrate development of innovative solutions
              while mentoring engineers. My approach combines backend architecture expertise with
              strong leadership to deliver products that make a difference.
            </p>
            <p>
              I specialize in creating scalable web applications, implementing microservices
              architectures, and ensuring code quality across teams. I also help product teams
              calculate effort and shape solutions for what they want to build.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-10">
            <div>
              <div className="text-on-surface font-black text-3xl">20+</div>
              <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-1">
                Projects Delivered
              </div>
            </div>
            <div className="w-px h-12 bg-outline-variant/30" />
            <div>
              <div className="text-on-surface font-black text-3xl">15+</div>
              <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-1">
                Engineers Led
              </div>
            </div>
            <div className="w-px h-12 bg-outline-variant/30" />
            <div>
              <div className="text-on-surface font-black text-3xl">99.9%</div>
              <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-1">
                Uptime Goal
              </div>
            </div>
          </div>
        </div>

        {/* Dark card side */}
        <div className="lg:w-1/2 w-full">
          <div className="relative overflow-hidden rounded-[2rem] bg-inverse-surface p-12 text-on-primary min-h-[400px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-container/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-white/50 font-bold text-xs uppercase tracking-[0.2em]">
                Currently At
              </span>
              <h3 className="text-white text-3xl font-black tracking-tight mt-2">B2B Fintech</h3>
              <p className="text-white/60 mt-3 text-lg">Technical Lead — Software Engineering</p>
            </div>
            <div className="relative z-10 mt-16 grid grid-cols-2 gap-6">
              {metrics.map(({ value, label }) => (
                <div key={label} className="bg-white/10 rounded-xl p-5">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
