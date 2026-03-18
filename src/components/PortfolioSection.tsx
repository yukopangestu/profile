import Image from 'next/image';
import { portfolioItems } from '@/data';

export default function PortfolioSection() {
  const [featured, side1, side2] = portfolioItems;

  return (
    <section id="portfolio" className="py-24 px-8 md:px-12 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <span className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
            Selected Works
          </span>
          <h2 className="text-5xl font-black leading-none tracking-tighter text-on-surface max-w-4xl mb-6">
            Digital experiences crafted with{' '}
            <span className="text-gradient">architectural precision.</span>
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            A collection of engineering projects focused on scalability, performance, and
            human-centric design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main featured project */}
          <div className="md:col-span-8 group">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-on-surface/5">
              <div className="aspect-video relative overflow-hidden bg-surface-dim">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-on-surface/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-surface-container-high text-on-surface text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    {featured.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">{featured.title}</h3>
                <p className="text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
                  {featured.description}
                </p>
                <a
                  href="#contact"
                  className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-2 group/link w-fit text-sm"
                >
                  Get in Touch
                  <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Side project 1 */}
          {side1 && (
            <div className="md:col-span-4 group">
              <div className="h-full bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-on-surface/5">
                <div className="aspect-[4/3] relative bg-surface-dim overflow-hidden">
                  <Image
                    src={side1.image}
                    alt={side1.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-surface-container-high text-on-surface text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                      {side1.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3">{side1.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{side1.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Side project 2 - wide layout */}
          {side2 && (
            <div className="md:col-span-8 group">
              <div className="h-full bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:shadow-on-surface/5">
                <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative bg-surface-dim overflow-hidden">
                  <Image
                    src={side2.image}
                    alt={side2.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-high text-on-surface text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                      {side2.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-3">{side2.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{side2.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA stat card */}
          <div className="md:col-span-4">
            <div className="h-full bg-inverse-surface rounded-xl p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-container/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-white/50 font-bold text-xs uppercase tracking-[0.2em]">
                  Always building
                </span>
                <h3 className="text-white text-2xl font-black mt-3 leading-tight">
                  Have a complex problem?
                </h3>
                <p className="text-white/60 text-sm mt-4 leading-relaxed">
                  Let&apos;s talk about how we can architect a solution together.
                </p>
                <a
                  href="mailto:yuko.pangestu@gmail.com"
                  className="mt-6 inline-flex items-center gap-2 bg-white text-inverse-surface px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-surface-bright transition-colors"
                >
                  Get in Touch
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
