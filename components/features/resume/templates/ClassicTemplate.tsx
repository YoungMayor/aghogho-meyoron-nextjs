import { ResumeData, ResumeConfig } from '@/lib/types';

interface ClassicTemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export default function ClassicTemplate({ data, config }: ClassicTemplateProps) {
  const { profile, careerHistory, education, skills, projects, socialLinks, badges, hobbies } =
    data;

  return (
    <div className="resume-classic bg-white dark:bg-white text-black p-8 print:p-6 shadow-lg print:shadow-none min-h-[297mm]">
      {/* Header */}
      <div className="resume-header mb-6">
        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
          {profile.titles.map((title, index) => (
            <span key={title}>
              {title}
              {index < profile.titles.length - 1 && ' • '}
            </span>
          ))}
        </div>

        {config.showSections.contact && (
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${profile.contact.email}`} className="hover:text-blue-600">
              {profile.contact.email}
            </a>
            <span>{profile.contact.phone}</span>
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="resume-body space-y-6">
        {config.showSections.summary && (
          <section className="resume-section">
            <h2 className="resume-section-title">Professional Summary</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {config.customSummary || profile.notes.about}
            </p>
          </section>
        )}

        {config.showSections.experience && careerHistory.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            <div className="space-y-4">
              {careerHistory.map((item) => (
                <div key={item.company_name} className="resume-item">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold">{item.role}</h3>
                      <p className="text-sm text-gray-600">{item.company_name}</p>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <p>
                        {new Date(item.start_date).getFullYear()} -{' '}
                        {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}
                      </p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{item.description}</p>
                  {item.duties.length > 0 && (
                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
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

        {config.showSections.education && education.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.school} className="resume-item">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{item.degree}</h3>
                      <p className="text-sm text-gray-600">{item.school}</p>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <p>
                        {item.start_year} - {item.end_year}
                      </p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {config.showSections.skills && skills.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.icons.slice(0, 12).map((icon) => (
                      <span
                        key={icon.label}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-100 rounded text-gray-800"
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

        {config.showSections.projects && projects.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Notable Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.name} className="resume-item">
                  <h3 className="font-bold">{project.name}</h3>
                  <p className="text-sm mb-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.icons.slice(0, 6).map((icon) => (
                      <span
                        key={icon.label}
                        className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-100 rounded text-gray-800"
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
            <h2 className="resume-section-title">Certifications & Badges</h2>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-100 rounded-full text-gray-800"
                >
                  {badge}
                </span>
              ))}
            </div>
          </section>
        )}

        {config.showSections.hobbies && hobbies.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby) => (
                <span key={hobby.name} className="text-sm text-gray-700">
                  {hobby.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
