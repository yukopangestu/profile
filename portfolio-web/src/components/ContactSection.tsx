import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaMedium } from 'react-icons/fa';

const socials = [
  {
    Icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/yukopangestu/',
    label: 'LinkedIn',
  },
  {
    Icon: FaGithub,
    href: 'https://github.com/yukopangestu',
    label: 'GitHub',
  },
  {
    Icon: FaMedium,
    href: 'https://medium.com/@yuko.pangestu',
    label: 'Medium',
  },
  {
    Icon: FaEnvelope,
    href: 'mailto:yuko.pangestu@gmail.com',
    label: 'Email',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-5 bg-blue-900">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Let&apos;s Connect</h2>
        <p className="text-blue-300 mb-14">
          I&apos;m always interested in new opportunities and collaborations
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
          <div className="flex flex-col items-center gap-2">
            <FaEnvelope size={24} className="text-blue-400" />
            <a
              href="mailto:yuko.pangestu@gmail.com"
              className="text-blue-300 hover:text-white text-sm transition-colors underline underline-offset-2"
            >
              yuko.pangestu@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaMapMarkerAlt size={24} className="text-blue-400" />
            <span className="text-white text-sm">Jakarta, Indonesia</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-16">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Yuko Pangestu. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
