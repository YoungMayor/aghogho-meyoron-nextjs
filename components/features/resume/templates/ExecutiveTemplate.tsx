import { ResumeData, ResumeConfig } from '@/lib/types';

interface ExecutiveTemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export default function ExecutiveTemplate({ data, config }: ExecutiveTemplateProps) {
  const { profile, careerHistory, education, skills, projects, socialLinks } = data;

  return (
    <div className="resume-executive bg-white dark:bg-white text-black p-8 print:p-8 min-h-[297mm] shadow-lg print:shadow-none">
      {/* Compact Header */}
      <header className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">{profile.name}</h1>
          <p className="text-sm font-semibold mt-1">{profile.titles.join('  |  ')}</p>
        </div>
        <div className="text-right text-xs">
          {config.showSections.contact && (
            <>
              <p>{profile.contact.email}</p>
              <p>{profile.contact.phone}</p>
              <p>
                {socialLinks
                  .find((l) => l.platform.toLowerCase() === 'linkedin')
                  ?.url.replace('https://', '') || 'linkedin.com/in/...'}
              </p>
            </>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Column (2/3) */}
        <div className="col-span-2 space-y-6">
          {config.showSections.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-1">
                Executive Summary
              </h2>
              <p className="text-sm leading-snug text-justify">
                {config.customSummary || profile.notes.about}
              </p>
            </section>
          )}

          {config.showSections.experience && careerHistory.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {careerHistory.map((item) => (
                  <div key={item.company_name}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm">{item.role}</h3>
                      <span className="text-xs font-semibold">
                        {new Date(item.start_date).getFullYear()} -{' '}
                        {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}
                      </span>
                    </div>
                    <div className="text-xs italic mb-1">
                      {item.company_name}, {item.location}
                    </div>
                    <ul className="list-disc list-outside ml-4 text-xs space-y-0.5 leading-snug">
                      {item.duties.map((duty, idx) => (
                        <li key={idx}>{duty}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {config.showSections.projects && projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                Select Achievements
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.name}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm">{project.name}</h3>
                    </div>
                    <p className="text-xs leading-snug">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column (1/3) */}
        <div className="col-span-1 space-y-6 bg-gray-50 p-4 -my-4 rounded">
          {config.showSections.skills && skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                Core Competencies
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <h3 className="text-xs font-semibold mb-1">{skill.name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.icons.slice(0, 8).map((icon) => (
                        <span
                          key={icon.label}
                          className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 rounded"
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

          {config.showSections.education && education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((item) => (
                  <div key={item.school}>
                    <div className="font-bold text-xs">{item.school}</div>
                    <div className="text-xs">{item.degree}</div>
                    <div className="text-xs italic text-gray-500">{item.end_year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
