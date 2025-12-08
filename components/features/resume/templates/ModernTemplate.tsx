import { ResumeData, ResumeConfig } from '@/lib/types';

interface ModernTemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export default function ModernTemplate({ data, config }: ModernTemplateProps) {
  const { profile, careerHistory, education, skills, projects, socialLinks, badges } = data;

  return (
    <div className="resume-modern bg-white dark:bg-white text-black min-h-[297mm] shadow-lg print:shadow-none">
      {/* Header */}
      <div className="resume-header p-8 text-black print:text-black">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
            <p className="text-lg opacity-90">{profile.titles[0]}</p>
          </div>
          {config.showSections.contact && (
            <div className="text-right text-sm space-y-1">
              <a href={`mailto:${profile.contact.email}`} className="block hover:underline">
                {profile.contact.email}
              </a>
              <div className="block">{profile.contact.phone}</div>
              {socialLinks.slice(0, 2).map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 p-8">
        {/* Main Content */}
        <div className="col-span-8 space-y-6">
          {config.showSections.summary && (
            <section className="resume-section">
              <h2 className="resume-section-title">Profile</h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {config.customSummary || profile.notes.about}
              </p>
            </section>
          )}

          {config.showSections.experience && careerHistory.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Experience</h2>
              <div className="space-y-6 border-l-2 border-slate-200 ml-2 pl-6 relative">
                {careerHistory.map((item) => (
                  <div key={item.company_name} className="resume-item relative">
                    {/* Timeline Dot */}
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-400"></span>

                    <div className="mb-2">
                      <h3 className="font-bold text-lg">{item.role}</h3>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-semibold">{item.company_name}</span>
                        <span>
                          {new Date(item.start_date).getFullYear()} -{' '}
                          {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mb-2 text-gray-700">{item.description}</p>
                    {item.duties.length > 0 && (
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                        {item.duties.slice(0, 3).map((duty, idx) => (
                          <li key={idx}>{duty}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {config.showSections.projects && projects.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Key Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.name} className="resume-item">
                    <h3 className="font-bold text-base">{project.name}</h3>
                    <p className="text-sm mb-1 text-gray-700">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.icons.slice(0, 4).map((icon) => (
                        <span key={icon.label} className="text-xs text-gray-500">
                          #{icon.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-8">
          {config.showSections.education && education.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Education</h2>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.school}>
                    <h3 className="font-bold text-sm">{item.degree}</h3>
                    <p className="text-sm text-gray-600 mb-1">{item.school}</p>
                    <p className="text-xs text-gray-500">
                      {item.start_year} - {item.end_year}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {config.showSections.skills && skills.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Expertise</h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">
                      {skill.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.icons.slice(0, 10).map((icon) => (
                        <span
                          key={icon.label}
                          className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium"
                        >
                          {icon.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {config.showSections.badges && badges.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Badges</h2>
              <ul className="text-sm space-y-1">
                {badges.map((badge) => (
                  <li key={badge} className="text-gray-700">
                    • {badge}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
