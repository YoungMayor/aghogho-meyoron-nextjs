import { academicRecords } from './academic_history';
import { careerItems } from './career_history';
import { profile } from './profile';
import { projects } from './projects';
import { technicalSkills } from './skills';
import { socialLinks } from './social_links';

const showFilter = (obj: { show: boolean }) => obj.show == true;

export const aiProfile = {
  ...profile,

  edu: academicRecords.filter(showFilter).map((record) => ({
    school: record.school,
    degree: record.degree,
    start: record.start_year,
    end: record.end_year,
  })),

  jobs: careerItems.filter(showFilter).map((record) => ({
    company: record.company_name,
    role: record.role,
    start: record.start_date,
    end: record.end_date,
    desc: record.description,
    location: record.location,
  })),

  projs: projects.map((project) => ({
    name: project.name,
    desc: project.description,
    feats: project.features,
    techs: project.icons.map((icon) => icon.label),
    type: project.type,
  })),

  skills: technicalSkills.map((skill) => ({
    name: skill.name,
    desc: skill.description,
    techs: skill.icons.map((icon) => icon.label),
  })),

  socials: socialLinks.filter(showFilter).map((social) => ({
    platform: social.platform,
    url: social.url,
    label: social.label,
  })),
};
