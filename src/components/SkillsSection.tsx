import TerminalChrome from './TerminalChrome';

const skillGroups = [
  {
    file: 'backend.go',
    title: 'Backend Engineering',
    description:
      'Designing high-throughput APIs and microservices. Built systems processing 10M+ transactions monthly.',
    tags: ['Go', 'PHP', 'RabbitMQ', 'REST'],
  },
  {
    file: 'storage.sql',
    title: 'Data & Storage',
    description:
      'Advanced query optimization and caching strategies. Reduced DB load by 70% through smart indexing.',
    tags: ['MySQL', 'NoSQL', 'Redis', 'Query Tuning'],
  },
  {
    file: 'lead.yaml',
    title: 'Tech Leadership',
    description:
      'Leading cross-functional teams of 15+ engineers. Hiring, mentoring, and setting technical direction.',
    tags: ['Architecture', 'CI/CD', 'Vue.js', 'Agile'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="border-t border-term-dim">
      <div className="max-w-content mx-auto px-5 sm:px-6 md:px-14 py-14 sm:py-16 md:py-[88px]">
        <div className="section-label">// what i bring</div>
        <h2 className="m-0 mb-8 sm:mb-10 text-[28px] sm:text-[32px] md:text-[44px] font-bold tracking-[-0.02em]">
          Technical Ecosystem
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-[22px]">
          {skillGroups.map(({ file, title, description, tags }) => (
            <div
              key={title}
              className="bg-terminal-surface border border-term rounded-lg overflow-hidden hover:border-term-hover transition-colors"
            >
              <TerminalChrome title={file} size="sm" />
              <div className="px-5 py-[22px]">
                <h3 className="m-0 mb-2.5 text-[18px] sm:text-[19px] font-bold">{title}</h3>
                <p className="m-0 mb-[18px] text-sm leading-[1.65] text-terminal-dim">
                  {description}
                </p>
                <div className="flex flex-wrap gap-[7px] font-mono text-[11px]">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="border border-term-strong text-terminal-blue px-[9px] py-1 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
