import Image from 'next/image';
import { portfolioItems } from '@/data';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="border-t border-term-dim">
      <div className="max-w-content mx-auto px-6 md:px-14 py-16 md:py-[88px]">
        <div className="section-label">// selected works</div>
        <h2 className="m-0 mb-4 max-w-[720px] text-[32px] md:text-[44px] font-bold leading-[1.12] tracking-[-0.02em]">
          Digital experiences crafted with architectural precision.
        </h2>
        <p className="m-0 mb-11 max-w-[560px] text-[15.5px] leading-[1.65] text-terminal-dim">
          A collection of engineering projects focused on scalability, performance, and
          human-centric design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {portfolioItems.map(item => (
            <div
              key={item.id}
              className="bg-terminal-surface border border-term rounded-lg overflow-hidden hover:border-term-hover transition-colors group"
            >
              <div className="relative w-full h-[200px] border-b border-term-dim bg-terminal-alt">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="font-mono text-[10.5px] text-terminal-blue tracking-[0.08em] mb-2 uppercase">
                  {item.category}
                </div>
                <h3 className="m-0 mb-2 text-[19px] font-bold">{item.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.6] text-terminal-dim">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-[26px] bg-[linear-gradient(90deg,rgba(47,111,224,0.18),rgba(47,111,224,0.05))] border border-term-mid rounded-lg px-6 md:px-8 py-7">
          <div>
            <div className="font-mono text-[11.5px] text-terminal-blue mb-1.5">
              // always building
            </div>
            <div className="text-[22px] font-bold">Have a complex problem?</div>
            <div className="text-sm text-terminal-dim mt-1">
              Let&apos;s talk about how we can architect a solution together.
            </div>
          </div>
          <a
            href="mailto:yuko.pangestu@gmail.com"
            className="bg-terminal-primary text-white px-[26px] py-3.5 rounded font-mono text-[13px] font-medium whitespace-nowrap hover:bg-terminal-primary-hover transition-colors"
          >
            get in touch →
          </a>
        </div>
      </div>
    </section>
  );
}
