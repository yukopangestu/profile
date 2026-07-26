'use client';

import { useEffect, useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_COPY,
  PORTFOLIO_EMAIL,
  PORTFOLIO_METRICS,
  PORTFOLIO_PROJECTS,
  type PortfolioCategory,
  type PortfolioLang,
  type PortfolioProject,
} from '@/data/portfolio';

type FilterKey = 'all' | PortfolioCategory;

const NAV = [
  { label: './home', href: '/#home' },
  { label: './skills', href: '/#skills' },
  { label: './portfolio', href: '/portfolio', active: true },
  { label: './experience', href: '/#experience' },
  { label: './blog', href: '/blog' },
];

export default function PortfolioPageClient() {
  const [lang, setLang] = useState<PortfolioLang>('en');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogTitleId = useId();

  const t = PORTFOLIO_COPY[lang];
  const mailto = `mailto:${PORTFOLIO_EMAIL}`;
  const list = PORTFOLIO_PROJECTS.filter(p => filter === 'all' || p.cat === filter);
  const open = PORTFOLIO_PROJECTS.find(p => p.slug === openSlug) ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenSlug(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="nocturne-portfolio">
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backdropFilter: 'blur(14px)',
          background: 'color-mix(in srgb, #161826 82%, transparent)',
          borderBottom: '1px solid var(--np-divider)',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--np-space-4)',
            padding: 'var(--np-space-3) var(--np-space-4)',
          }}
        >
          <Link
            href="/"
            className="np-mono"
            style={{
              fontSize: 13,
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexShrink: 0,
            }}
          >
            <span style={{ opacity: 0.5 }}>~/yuko-pangestu/</span>
            <span>portfolio</span>
            <span className="np-cursor">_</span>
          </Link>

          <nav
            className="np-desktop-nav np-mono"
            aria-label="Primary"
            style={{ display: 'flex', gap: 'var(--np-space-4)', fontSize: 12.5 }}
          >
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`np-nav-link${item.active ? ' is-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--np-space-2)', flexShrink: 0 }}>
            <div className="np-seg np-mono" role="group" aria-label="Language">
              <button
                type="button"
                className="np-seg-opt"
                aria-current={lang === 'en' ? 'true' : undefined}
                onClick={() => setLang('en')}
              >
                en
              </button>
              <button
                type="button"
                className="np-seg-opt"
                aria-current={lang === 'id' ? 'true' : undefined}
                onClick={() => setLang('id')}
              >
                id
              </button>
            </div>
            <a className="np-btn np-btn-primary np-desktop-nav" href={mailto}>
              hire --me
            </a>
            <button
              type="button"
              className="np-mobile-toggle np-btn np-btn-secondary"
              style={{ display: 'none' }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="np-mono"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '0 var(--np-space-4) var(--np-space-4)',
              borderTop: '1px solid var(--np-divider)',
            }}
          >
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`np-nav-link${item.active ? ' is-active' : ''}`}
                style={{ padding: '10px 0', borderBottom: '1px solid var(--np-divider)', fontSize: 13 }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              className="np-btn np-btn-primary"
              href={mailto}
              style={{ marginTop: 10, textAlign: 'center' }}
            >
              hire --me
            </a>
          </div>
        )}
      </header>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'var(--np-space-8) var(--np-space-4) var(--np-space-6)' }}>
        <div className="np-mono" style={{ fontSize: 12.5, color: 'var(--np-accent)', marginBottom: 'var(--np-space-3)' }}>
          {t.kicker}
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 62px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: 500,
            margin: 0,
            maxWidth: '17ch',
          }}
        >
          {t.title}
        </h1>
        <p
          style={{
            margin: 'var(--np-space-4) 0 0',
            maxWidth: '62ch',
            fontSize: 16.5,
            lineHeight: 1.62,
            color: 'color-mix(in srgb, var(--np-text) 76%, transparent)',
          }}
        >
          {t.lede}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--np-space-2)', marginTop: 'var(--np-space-4)' }}>
          <a className="np-btn np-btn-primary" href={mailto}>
            {t.ctaMail}
          </a>
          <a className="np-btn np-btn-secondary" href="https://www.linkedin.com/in/yukopangestu/" target="_blank" rel="noreferrer">
            {t.ctaLinkedin}
          </a>
          <a className="np-btn np-btn-secondary" href="https://github.com/yukopangestu" target="_blank" rel="noreferrer">
            github
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 var(--np-space-4)' }}>
        <div
          className="np-metrics"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--np-divider)',
            border: '1px solid var(--np-divider)',
            borderRadius: 'var(--np-radius-md)',
            overflow: 'hidden',
          }}
        >
          {PORTFOLIO_METRICS[lang].map(m => (
            <div
              key={m.label}
              style={{
                background: 'var(--np-bg)',
                padding: 'var(--np-space-4) var(--np-space-4) var(--np-space-3)',
              }}
            >
              <div style={{ fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                {m.value}
              </div>
              <div
                className="np-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  marginTop: 8,
                  color: 'color-mix(in srgb, var(--np-text) 52%, transparent)',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <main id="works" style={{ maxWidth: 1180, margin: '0 auto', padding: 'var(--np-space-6) var(--np-space-4) var(--np-space-8)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--np-space-3)',
            marginBottom: 'var(--np-space-4)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginRight: 'auto' }}>
            {(
              [
                { key: 'all' as FilterKey, label: t.all },
                ...PORTFOLIO_CATEGORIES.map(c => ({ key: c as FilterKey, label: c })),
              ]
            ).map(f => (
              <button
                key={f.key}
                type="button"
                className={`np-chip${filter === f.key ? ' is-active' : ''}`}
                onClick={() => {
                  setFilter(f.key);
                  setOpenSlug(null);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div
            className="np-mono"
            style={{ fontSize: 12, color: 'color-mix(in srgb, var(--np-text) 50%, transparent)' }}
          >
            {t.count(list.length)}
          </div>
        </div>

        <div
          className="np-works-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 'var(--np-space-4)',
          }}
        >
          {list.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              lang={lang}
              readMore={t.readMore}
              delayMs={i * 40}
              onOpen={() => setOpenSlug(p.slug)}
            />
          ))}
        </div>
      </main>

      {open && (
        <div
          className="np-dialog-backdrop"
          role="presentation"
          onClick={() => setOpenSlug(null)}
        >
          <div
            className="np-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="np-mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--np-space-3)',
                padding: 'var(--np-space-3) var(--np-space-4)',
                borderBottom: '1px solid var(--np-divider)',
                fontSize: 12,
              }}
            >
              <span style={{ color: 'color-mix(in srgb, var(--np-text) 45%, transparent)' }}>
                ~/portfolio/
              </span>
              <span style={{ color: 'var(--np-accent)' }}>{open.slug}</span>
              <button
                type="button"
                className="np-btn np-btn-secondary np-btn-icon"
                style={{ marginLeft: 'auto' }}
                aria-label={t.close}
                onClick={() => setOpenSlug(null)}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                padding: 'var(--np-space-4) var(--np-space-4) var(--np-space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--np-space-4)',
              }}
            >
              <div>
                <div className="np-mono" style={{ fontSize: 11.5, color: 'var(--np-accent-300)' }}>
                  {open.role[lang]} · {open.years}
                </div>
                <h2
                  id={dialogTitleId}
                  style={{
                    margin: '8px 0 0',
                    fontSize: 'clamp(26px, 4vw, 34px)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {open.name}
                </h2>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 15.5,
                  lineHeight: 1.68,
                  color: 'color-mix(in srgb, var(--np-text) 82%, transparent)',
                }}
              >
                {open.detail[lang]}
              </p>

              <div
                className="np-figures"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1,
                  background: 'var(--np-divider)',
                  border: '1px solid var(--np-divider)',
                  borderRadius: 'var(--np-radius-md)',
                  overflow: 'hidden',
                }}
              >
                {open.figures.map(f => (
                  <div key={f.label[lang]} style={{ background: 'var(--np-surface)', padding: 'var(--np-space-3)' }}>
                    <div style={{ fontSize: 22, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                      {f.value}
                    </div>
                    <div
                      className="np-mono"
                      style={{
                        fontSize: 10.5,
                        marginTop: 5,
                        color: 'color-mix(in srgb, var(--np-text) 50%, transparent)',
                      }}
                    >
                      {f.label[lang]}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div
                  className="np-mono"
                  style={{
                    fontSize: 11.5,
                    color: 'color-mix(in srgb, var(--np-text) 50%, transparent)',
                    marginBottom: 10,
                  }}
                >
                  {t.highlights}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {open.points[lang].map(pt => (
                    <div
                      key={pt}
                      style={{
                        display: 'flex',
                        gap: 10,
                        fontSize: 14.5,
                        lineHeight: 1.55,
                        color: 'color-mix(in srgb, var(--np-text) 80%, transparent)',
                      }}
                    >
                      <span className="np-mono" style={{ color: 'var(--np-accent)' }}>
                        ▸
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="np-mono"
                  style={{
                    fontSize: 11.5,
                    color: 'color-mix(in srgb, var(--np-text) 50%, transparent)',
                    marginBottom: 10,
                  }}
                >
                  {t.stack}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {open.stack.map(s => (
                    <span key={s} className="np-tag np-tag-accent">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--np-space-2)', marginTop: 'var(--np-space-2)' }}>
                <a
                  className="np-btn np-btn-primary"
                  href={`${mailto}?subject=${encodeURIComponent(`Re: ${open.name}`)}`}
                >
                  {t.askAbout}
                </a>
                <button type="button" className="np-btn np-btn-secondary" onClick={() => setOpenSlug(null)}>
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        style={{
          borderTop: '1px solid var(--np-divider)',
          background: 'linear-gradient(180deg, transparent, color-mix(in srgb, #262a60 45%, transparent))',
        }}
      >
        <div
          className="np-cta-grid"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: 'var(--np-space-8) var(--np-space-4)',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 'var(--np-space-6)',
            alignItems: 'end',
          }}
        >
          <div>
            <div className="np-mono" style={{ fontSize: 12.5, color: 'var(--np-accent)', marginBottom: 'var(--np-space-3)' }}>
              {t.ctaKicker}
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                maxWidth: '20ch',
                lineHeight: 1.1,
              }}
            >
              {t.ctaTitle}
            </h2>
            <p
              style={{
                margin: 'var(--np-space-3) 0 0',
                maxWidth: '52ch',
                fontSize: 15.5,
                lineHeight: 1.6,
                color: 'color-mix(in srgb, var(--np-text) 74%, transparent)',
              }}
            >
              {t.ctaBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--np-space-2)' }}>
            <a className="np-btn np-btn-primary np-btn-block" href={mailto}>
              {t.ctaMail}
            </a>
            <a
              className="np-btn np-btn-secondary np-btn-block"
              href="https://www.linkedin.com/in/yukopangestu/"
              target="_blank"
              rel="noreferrer"
            >
              {t.ctaLinkedin}
            </a>
            <div
              className="np-mono"
              style={{
                fontSize: 11.5,
                color: 'color-mix(in srgb, var(--np-text) 45%, transparent)',
                marginTop: 6,
              }}
            >
              {t.location}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--np-divider)' }}>
        <div
          className="np-mono"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: 'var(--np-space-4)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--np-space-3)',
            alignItems: 'center',
            fontSize: 11.5,
            color: 'color-mix(in srgb, var(--np-text) 45%, transparent)',
          }}
        >
          <span style={{ marginRight: 'auto' }}>~/yuko-pangestu · senior full stack · jakarta</span>
          <a href="https://github.com/yukopangestu" target="_blank" rel="noreferrer">
            github
          </a>
          <a href="https://www.linkedin.com/in/yukopangestu/" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href="https://medium.com/@yuko.pangestu" target="_blank" rel="noreferrer">
            medium
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({
  project,
  lang,
  readMore,
  delayMs,
  onOpen,
}: {
  project: PortfolioProject;
  lang: PortfolioLang;
  readMore: string;
  delayMs: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="np-card"
      style={{ animationDelay: `${delayMs}ms` }}
      onClick={onOpen}
    >
      <div className="np-card-media">
        {project.img ? (
          <Image src={project.img} alt={project.name} fill sizes="(max-width: 720px) 100vw, 340px" />
        ) : (
          <div
            className="np-mono"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'var(--np-space-4)',
            }}
          >
            <div style={{ fontSize: 11, color: 'color-mix(in srgb, var(--np-text) 38%, transparent)' }}>
              $ open
            </div>
            <div
              style={{
                fontSize: 19,
                color: 'var(--np-accent-300)',
                marginTop: 6,
                wordBreak: 'break-all',
              }}
            >
              {project.domain}
            </div>
            <div
              style={{
                height: 1,
                marginTop: 14,
                background:
                  'linear-gradient(to right, transparent, color-mix(in srgb, var(--np-accent) 55%, transparent) 20%, transparent 92%)',
              }}
            />
          </div>
        )}
        <div
          className="np-mono"
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontSize: 10.5,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '4px 8px',
            borderRadius: 6,
            background: 'color-mix(in srgb, #161826 78%, transparent)',
            border: '1px solid var(--np-divider)',
            color: 'var(--np-accent-300)',
          }}
        >
          {project.cat}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 'var(--np-space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--np-space-2)' }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>
            {project.name}
          </h3>
          <span
            className="np-mono"
            style={{
              marginLeft: 'auto',
              fontSize: 11.5,
              fontVariantNumeric: 'tabular-nums',
              color: 'color-mix(in srgb, var(--np-text) 45%, transparent)',
              whiteSpace: 'nowrap',
            }}
          >
            {project.years}
          </span>
        </div>
        <div className="np-mono" style={{ fontSize: 11.5, color: 'var(--np-accent-300)' }}>
          {project.role[lang]}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.6,
            color: 'color-mix(in srgb, var(--np-text) 72%, transparent)',
          }}
        >
          {project.summary[lang]}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
          {project.stack.map(s => (
            <span key={s} className="np-tag np-tag-neutral">
              {s}
            </span>
          ))}
        </div>
        <div
          className="np-mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 6,
            fontSize: 12,
            color: 'var(--np-accent)',
          }}
        >
          {readMore}
        </div>
      </div>
    </button>
  );
}
