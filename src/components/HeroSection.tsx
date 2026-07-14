import Image from 'next/image';
import TerminalChrome from './TerminalChrome';
import WeatherWidget from './WeatherWidget';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_60%_55%_at_72%_15%,rgba(47,111,224,0.16),transparent)]"
    >
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center max-w-content mx-auto px-5 sm:px-6 md:px-14 pt-14 sm:pt-20 md:pt-24 pb-20 sm:pb-24">
        {/* Left */}
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 border border-term-strong rounded-full px-3 sm:px-3.5 py-1.5 font-mono text-[11px] sm:text-[11.5px] text-terminal-blue mb-5 sm:mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-terminal-green shrink-0" />
            on developing right now
          </div>

          <div className="font-mono text-[12px] sm:text-[13px] text-terminal-blue mb-5 sm:mb-[22px]">
            <span className="whitespace-nowrap">$ whoami</span>{' '}
            <span className="text-terminal-faint break-words">
              — senior full stack · software engineer · jakarta
            </span>
          </div>

          <h1 className="m-0 text-[44px] sm:text-[72px] md:text-[92px] font-bold leading-[0.98] tracking-[-0.03em]">
            Yuko
            <br />
            Pangestu
            <span className="text-terminal-primary animate-blink">_</span>
          </h1>

          <p className="max-w-[560px] mt-6 sm:mt-8 text-[15px] sm:text-[16px] md:text-[17.5px] leading-[1.65] text-terminal-muted">
            I build resilient, high-throughput systems and lead cross-functional engineering teams.
            8+ years of turning complex technical challenges into clean, scalable solutions.
            Currently developing Java, Go, and Angular.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3.5 mt-8 sm:mt-10 font-mono text-[13px] sm:text-[13.5px]">
            <a
              href="#portfolio"
              className="bg-terminal-primary text-white px-6 sm:px-7 py-3.5 rounded font-medium hover:bg-terminal-primary-hover transition-colors text-center"
            >
              view ./portfolio →
            </a>
            <a
              href="#experience"
              className="border border-term-soft text-terminal-soft px-6 sm:px-7 py-3.5 rounded hover:border-terminal-blue hover:text-white transition-colors text-center"
            >
              cat experience.md
            </a>
          </div>

          {/* Live Jakarta weather — mobile / stacked under CTAs; desktop hidden (chip on photo) */}
          <div className="mt-8 sm:mt-10 max-w-sm lg:hidden">
            <WeatherWidget variant="panel" />
          </div>
        </div>

        {/* Right: terminal photo frame */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 pb-6 sm:pb-4">
          <div className="relative border border-term-strong rounded-[10px] overflow-hidden bg-terminal-surface">
            <TerminalChrome title="yuko@jakarta:~" />
            <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-[360px] md:h-[420px]">
              <Image
                src="/hero_img.jpg"
                alt="Yuko Pangestu"
                fill
                className="object-cover object-top saturate-[0.9]"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-2 sm:-left-2 md:-left-[22px] bg-terminal-surface border border-term-strong rounded-lg px-4 sm:px-5 py-3 font-mono text-xs shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="text-terminal-blue font-bold text-sm sm:text-base">8+ years</div>
            <div className="text-terminal-faint mt-0.5">engineering depth</div>
          </div>

          {/* Desktop: floating weather chip on photo */}
          <WeatherWidget
            variant="chip"
            className="hidden lg:block absolute bottom-0 right-2 sm:-right-2 md:-right-[18px] max-w-[160px]"
          />
        </div>
      </div>
    </section>
  );
}
