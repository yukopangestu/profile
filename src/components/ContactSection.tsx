const socials = [
  {
    icon: 'terminal',
    href: 'https://github.com/yukopangestu',
    label: 'GitHub',
  },
  {
    icon: 'work',
    href: 'https://www.linkedin.com/in/yukopangestu/',
    label: 'LinkedIn',
  },
  {
    icon: 'article',
    href: 'https://medium.com/@yuko.pangestu',
    label: 'Medium',
  },
  {
    icon: 'mail',
    href: 'mailto:yuko.pangestu@gmail.com',
    label: 'Email',
  },
];

export default function ContactSection() {
  return (
    <>
      <section id="contact" className="py-24 px-8 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <p className="text-primary font-bold tracking-[0.05em] text-xs uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="text-on-surface font-black text-5xl md:text-6xl tracking-tight leading-tight max-w-3xl">
              Let&apos;s Connect<span className="text-primary">.</span>
            </h2>
            <p className="mt-6 text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              I&apos;m always open to new opportunities, collaborations, and meaningful
              conversations about technology and leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact info + socials */}
            <div className="lg:col-span-5 space-y-10">
              <div className="flex items-start gap-6">
                <div className="bg-surface-container-highest p-4 rounded-xl text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <div>
                  <h3 className="text-on-surface font-bold text-lg">Direct Email</h3>
                  <a
                    href="mailto:yuko.pangestu@gmail.com"
                    className="text-on-surface-variant mt-1 block hover:text-primary transition-colors text-sm"
                  >
                    yuko.pangestu@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-surface-container-highest p-4 rounded-xl text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="text-on-surface font-bold text-lg">Location</h3>
                  <p className="text-on-surface-variant mt-1 text-sm">Jakarta, Indonesia</p>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-surface-container-lowest p-8 rounded-xl space-y-6">
                <h3 className="text-on-surface font-bold text-lg">Digital Presence</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socials.map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform text-xl">
                        {icon}
                      </span>
                      <span className="font-medium text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote card */}
              <div className="relative overflow-hidden h-44 rounded-xl bg-inverse-surface">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_1px,_transparent_1px)] bg-[length:20px_20px]" />
                <div className="absolute bottom-6 left-8 text-on-primary pr-8">
                  <p className="text-[0.65rem] uppercase tracking-widest font-bold opacity-70">
                    Philosophy
                  </p>
                  <p className="text-lg font-bold leading-tight mt-1">
                    Code is the modern architecture of human experience.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA gradient card */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[2rem] hero-gradient p-12 md:p-16 text-center text-on-primary shadow-2xl shadow-primary/30 h-full flex flex-col justify-center min-h-[400px]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                    Ready to build something great?
                  </h2>
                  <p className="text-on-primary/80 text-lg max-w-lg mx-auto mb-10">
                    I bring 8+ years of engineering depth and leadership experience. Let&apos;s
                    talk about how I can help your team ship faster and build better.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="mailto:yuko.pangestu@gmail.com"
                      className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-surface-bright active:scale-95 transition-all shadow-lg text-sm"
                    >
                      Send an Email
                    </a>
                    <a
                      href="https://www.linkedin.com/in/yukopangestu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-container/20 border border-white/20 text-on-primary px-10 py-4 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all text-sm"
                    >
                      View LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 px-8 bg-[#192b6b]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-screen-2xl mx-auto text-center md:text-left">
          <div>
            <div className="text-lg font-bold text-[#fbf8ff]">Yuko Pangestu</div>
            <p className="text-[#fbf8ff]/60 text-sm tracking-wide mt-1">
              Technical Lead · Paper.id · Jakarta
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {socials.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-[#fbf8ff]/60 hover:text-[#2563eb] transition-colors text-sm"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="text-[#fbf8ff]/60 text-sm">
            © {new Date().getFullYear()} Yuko Pangestu. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
