import Icon from '@/components/ui/Icon';
import { ResumeData, ResumeConfig } from '@/lib/types';
import Image from 'next/image';

interface MinimalTemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export default function MinimalTemplate({ data, config }: MinimalTemplateProps) {
  const { profile, careerHistory, education, skills, projects, socialLinks } = data;

  return (
    <div className="resume-minimal bg-white dark:bg-white text-black p-8 md:p-12 print:p-8 min-h-[297mm] shadow-lg print:shadow-none font-serif">
      {/* Header */}
      <header
        className="resume-header mb-8 text-center border-b pb-8"
        style={{ borderColor: config.themeColor }}
      >
        {config.showAvatar && profile.avatar_url && (
          <div className="mx-auto w-24 h-24 relative mb-4">
            <Image
              src={profile.avatar_url}
              alt={profile.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}

        <h1
          className="text-3xl text-center font-bold uppercase tracking-widest mb-2"
          style={{ color: config.themeColor }}
        >
          {profile.name}
        </h1>

        <p className="text-sm text-center tracking-wide uppercase text-gray-600 mb-4">
          {profile.titles.join(' / ')}
        </p>

        {config.showSections.contact && (
          <>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-2 text-sm text-gray-600">
              <a href={`mailto:${profile.contact.email}`} className="hover:text-black">
                {profile.contact.email}
              </a>

              <span>{profile.contact.phone}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black flex items-center gap-1"
                >
                  <Icon.fromIcon icon={link.icon} size={14} />

                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </header>

      {config.showSections.summary && (
        <section className="resume-section mb-8">
          <p className="text-sm leading-relaxed text-justify max-w-3xl mx-auto text-gray-800">
            {config.customSummary || profile.notes.about}
          </p>
        </section>
      )}

      {config.showSections.skills && skills.length > 0 && (
        <section className="resume-section mb-8 text-center">
          <h2
            className="resume-section-title text-center text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: config.themeColor }}
          >
            Core Competencies
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-8">
            {skills
              .flatMap((skill) => skill.icons)
              .map((icon, index) => (
                <span key={`skill-${index}-${icon.label}`} className="text-sm relative">
                  {icon.label}
                </span>
              ))}
          </div>
        </section>
      )}

      {config.showSections.experience && careerHistory.length > 0 && (
        <section className="resume-section mb-8">
          <h2
            className="resume-section-title text-center text-sm font-bold uppercase tracking-widest mb-6"
            style={{ color: config.themeColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {careerHistory.map((item) => (
              <div key={item.company_name} className="resume-item">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2">
                  <h3 className="font-bold text-base">{item.company_name}</h3>
                  <div className="text-sm italic text-gray-600">
                    {item.location} | {new Date(item.start_date).getFullYear()} –{' '}
                    {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}
                  </div>
                </div>
                <div className="mb-2 italic text-sm">{item.role}</div>
                <ul className="list-disc list-outside ml-5 text-sm space-y-1 text-gray-800 leading-snug">
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
        <section className="resume-section mb-8">
          <h2
            className="resume-section-title text-center text-sm font-bold uppercase tracking-widest mb-6"
            style={{ color: config.themeColor }}
          >
            Top Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.name} className="resume-item">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">{project.name}</h3>
                  {config.showSkillIcons && (
                    <div className="flex gap-2 text-xs text-gray-500">
                      {project.icons.map((i) => i.label).join(', ')}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-800">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {config.showSections.education && education.length > 0 && (
        <section className="resume-section text-center">
          <h2
            className="resume-section-title text-center text-sm font-bold uppercase tracking-widest mb-6"
            style={{ color: config.themeColor }}
          >
            Education
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {education.map((item) => (
              <div key={item.school} className="mb-2">
                <div className="font-bold text-sm">{item.school}</div>
                <div className="text-sm italic">
                  {item.degree} — {item.end_year}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
