import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center px-8 md:px-12 py-20 overflow-hidden bg-background"
    >
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text */}
        <div className="lg:col-span-7 z-10">
          <span className="text-primary font-bold text-xs tracking-[0.05em] uppercase mb-4 block">
            Technical Lead · Paper.id · Jakarta
          </span>
          <h1 className="text-on-surface font-black text-5xl md:text-7xl tracking-[-0.02em] leading-[1.1] mb-8">
            Yuko<br />
            <span className="text-primary">
              Pangestu<span className="text-primary-container">.</span>
            </span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            I build resilient, high-throughput systems and lead cross-functional engineering teams.
            8+ years of turning complex technical challenges into clean, scalable solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="hero-gradient text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-200 flex items-center gap-2 text-sm"
            >
              View Portfolio
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <a
              href="#experience"
              className="bg-surface-container-low text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors active:scale-95 text-sm"
            >
              My Experience
            </a>
          </div>
        </div>

        {/* Right: Photo card */}
        <div className="lg:col-span-5 relative h-full flex justify-center lg:justify-end">
          <div className="relative w-full aspect-[4/5] max-w-md">
            {/* Ambient blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

            {/* Portrait */}
            <div className="relative w-full h-full bg-surface-container-low rounded-[2rem] overflow-hidden shadow-2xl shadow-on-surface/5">
              <Image
                src="/hero_img.jpg"
                alt="Yuko Pangestu"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Floating metric chip */}
            <div className="absolute bottom-10 -left-6 glass-panel p-5 rounded-2xl shadow-xl shadow-on-surface/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
                <span className="material-symbols-outlined">code_blocks</span>
              </div>
              <div>
                <div className="text-on-surface font-bold text-lg">8+ Years</div>
                <div className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">
                  Engineering Depth
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
