const socials = [
  { href: 'https://github.com/yukopangestu', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yukopangestu/', label: 'LinkedIn' },
  { href: 'https://medium.com/@yuko.pangestu', label: 'Medium' },
  { href: 'mailto:yuko.pangestu@gmail.com', label: 'Email' },
];

export default function ContactSection() {
  return (
    <>
      {/* Contact */}
      <section id="contact" className="border-t border-term-dim">
        <div className="max-w-content mx-auto px-5 sm:px-6 md:px-14 py-14 sm:py-16 md:py-[88px]">
          <div className="section-label">// get in touch</div>
          <h2 className="m-0 mb-8 sm:mb-11 text-[28px] sm:text-[32px] md:text-[44px] font-bold tracking-[-0.02em]">
            Let&apos;s Connect<span className="text-terminal-primary">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="min-w-0">
              <p className="m-0 mb-7 sm:mb-[34px] max-w-[480px] text-[15px] sm:text-[15.5px] leading-[1.7] text-terminal-muted">
                I&apos;m always open to new opportunities, collaborations, and meaningful
                conversations about technology and leadership.
              </p>
              <div className="flex flex-col gap-4 sm:gap-[18px] font-mono text-[13px] sm:text-[13.5px]">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3.5 sm:items-baseline min-w-0">
                  <span className="text-terminal-blue shrink-0">email →</span>
                  <a
                    href="mailto:yuko.pangestu@gmail.com"
                    className="text-terminal-text hover:text-terminal-blue transition-colors break-all"
                  >
                    yuko.pangestu@gmail.com
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3.5 sm:items-baseline">
                  <span className="text-terminal-blue shrink-0">location →</span>
                  <span className="text-terminal-text">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="font-mono text-xs text-terminal-faint mb-[18px]">
                // digital presence
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 font-mono text-[12px] sm:text-[13px]">
                {socials.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="border border-term-mid rounded-md px-3 sm:px-[18px] py-3.5 sm:py-4 text-terminal-soft flex justify-between items-center gap-2 hover:border-terminal-blue hover:text-white transition-colors min-w-0"
                  >
                    <span className="truncate">{label}</span>
                    <span className="text-terminal-blue shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-term-dim bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,rgba(47,111,224,0.18),transparent)]">
        <div className="max-w-content mx-auto px-5 sm:px-6 md:px-14 py-16 sm:py-20 md:py-24 text-center">
          <div className="font-mono text-[11px] sm:text-[12.5px] text-terminal-blue mb-4 sm:mb-[18px] px-2 leading-relaxed">
            // philosophy: code is the modern architecture of human experience
          </div>
          <h2 className="m-0 mx-auto mb-4 sm:mb-5 max-w-[640px] text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em]">
            Ready to build something great?
          </h2>
          <p className="m-0 mx-auto mb-8 sm:mb-[38px] max-w-[540px] text-[15px] sm:text-[15.5px] leading-[1.7] text-terminal-muted">
            I bring 8+ years of engineering depth and leadership experience. Let&apos;s talk about
            how I can help your team ship faster and build better.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3.5 justify-center font-mono text-[13px] sm:text-[13.5px]">
            <a
              href="mailto:yuko.pangestu@gmail.com"
              className="bg-terminal-primary text-white px-6 sm:px-[30px] py-3.5 sm:py-[15px] rounded font-medium hover:bg-terminal-primary-hover transition-colors"
            >
              send an email
            </a>
            <a
              href="https://www.linkedin.com/in/yukopangestu/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-term-soft text-terminal-soft px-6 sm:px-[30px] py-3.5 sm:py-[15px] rounded hover:border-terminal-blue hover:text-white transition-colors"
            >
              view linkedin
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-term-dim">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 max-w-content mx-auto px-5 sm:px-6 md:px-14 py-7 sm:py-8 font-mono text-[11px] sm:text-xs text-terminal-faint text-center md:text-left">
          <div className="leading-relaxed max-w-sm md:max-w-none">
            <span className="text-terminal-blue font-bold">~/yuko-pangestu</span>
            <span className="hidden sm:inline">
              {' · '}senior full stack · sobat bisnis group · jakarta
            </span>
            <span className="sm:hidden block mt-1">senior full stack · jakarta</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-[22px]">
            {socials
              .filter(s => s.label !== 'Email')
              .map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-dim hover:text-terminal-text transition-colors lowercase"
                >
                  {label}
                </a>
              ))}
          </div>
          <div>© {new Date().getFullYear()} yuko pangestu. all rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
