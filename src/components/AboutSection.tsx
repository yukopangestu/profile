const stats = [
  { number: '8+', label: 'Years Experience' },
  { number: '10+', label: 'Technologies' },
  { number: '20+', label: 'Projects Delivered' },
  { number: '4+', label: 'Team Members Led' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-5 bg-blue-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-3">About Me</h2>
        <p className="text-lg text-gray-400 text-center mb-14">
          Technical Lead with 8+ years of experience in full-stack development
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:w-80 flex-shrink-0">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-5xl font-extrabold text-blue-800 mb-1">{stat.number}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl p-7 shadow-sm flex-1">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Building Digital Excellence</h3>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              As a Technical Lead at Paper.id, I orchestrate the development of innovative
              solutions while mentoring a diverse team of engineers. My journey in tech has
              equipped me with a comprehensive skill set spanning from backend architecture to
              frontend implementation.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              I specialize in creating scalable web applications, implementing microservices
              architectures, and ensuring code quality across teams. My approach combines
              technical expertise with strong leadership to deliver products that make a
              difference.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              I also help the product team calculate and provide solutions about what they want
              to build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
