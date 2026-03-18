const skillGroups = [
  {
    icon: 'terminal',
    title: 'Backend Engineering',
    description:
      'Designing high-throughput APIs and microservices. Built systems processing 10M+ transactions monthly.',
    tags: ['Go', 'PHP', 'RabbitMQ', 'REST'],
  },
  {
    icon: 'database',
    title: 'Data & Storage',
    description:
      'Advanced query optimization and caching strategies. Reduced DB load by 70% through smart indexing.',
    tags: ['MySQL', 'NoSQL', 'Redis', 'Query Tuning'],
  },
  {
    icon: 'groups',
    title: 'Tech Leadership',
    description:
      'Leading cross-functional teams of 15+ engineers. Hiring, mentoring, and setting technical direction.',
    tags: ['Architecture', 'CI/CD', 'Vue.js', 'Agile'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-8 md:px-12 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-bold text-xs tracking-[0.05em] uppercase mb-4 block">
            What I Bring
          </span>
          <h2 className="text-on-surface font-black text-3xl md:text-4xl tracking-tight mb-4">
            Technical <span className="text-primary">Ecosystem</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map(({ icon, title, description, tags }) => (
            <div
              key={title}
              className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-[0_8px_48px_rgba(0,20,83,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                {icon}
              </span>
              <h3 className="text-on-surface font-bold text-xl mb-4">{title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-surface-container-high px-3 py-1 rounded-sm text-xs font-bold text-on-surface"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
