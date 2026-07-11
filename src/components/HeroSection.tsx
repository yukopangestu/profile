import Image from 'next/image';
import TerminalChrome from './TerminalChrome';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_60%_55%_at_72%_15%,rgba(47,111,224,0.16),transparent)]"
    >
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center max-w-content mx-auto px-6 md:px-14 pt-20 md:pt-24 pb-16 md:pb-22">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 border border-term-strong rounded-full px-3.5 py-1.5 font-mono text-[11.5px] text-terminal-blue mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-terminal-green" />
            open to opportunities
          </div>

          <div className="font-mono text-[13px] text-terminal-blue mb-[22px]">
            $ whoami{' '}
            <span className="text-terminal-faint">
              — technical lead · software engineer · jakarta
            </span>
          </div>

          <h1 className="m-0 text-[56px] sm:text-[72px] md:text-[92px] font-bold leading-[0.98] tracking-[-0.03em]">
            Yuko
            <br />
            Pangestu
            <span className="text-terminal-primary animate-blink">_</span>
          </h1>

          <p className="max-w-[560px] mt-8 text-[16px] md:text-[17.5px] leading-[1.65] text-terminal-muted">
            I build resilient, high-throughput systems and lead cross-functional engineering teams.
            8+ years of turning complex technical challenges into clean, scalable solutions.
          </p>

          <div className="flex flex-wrap gap-3.5 mt-10 font-mono text-[13.5px]">
            <a
              href="#portfolio"
              className="bg-terminal-primary text-white px-7 py-3.5 rounded font-medium hover:bg-terminal-primary-hover transition-colors"
            >
              view ./portfolio →
            </a>
            <a
              href="#experience"
              className="border border-term-soft text-terminal-soft px-7 py-3.5 rounded hover:border-terminal-blue hover:text-white transition-colors"
            >
              cat experience.md
            </a>
          </div>
        </div>

        {/* Right: terminal photo frame */}
        <div className="relative">
          <div className="relative border border-term-strong rounded-[10px] overflow-hidden bg-terminal-surface">
            <TerminalChrome title="yuko@jakarta:~" />
            <div className="relative w-full h-[320px] md:h-[420px]">
              <Image
                src="/hero_img.jpg"
                alt="Yuko Pangestu"
                fill
                className="object-cover object-top saturate-[0.9]"
                priority
              />
            </div>
          </div>

          <div className="absolute -bottom-[18px] -left-[8px] md:-left-[22px] bg-terminal-surface border border-term-strong rounded-lg px-5 py-3.5 font-mono text-xs shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="text-terminal-blue font-bold text-base">8+ years</div>
            <div className="text-terminal-faint mt-0.5">engineering depth</div>
          </div>
        </div>
      </div>
    </section>
  );
}
