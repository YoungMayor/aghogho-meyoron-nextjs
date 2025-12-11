import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { softSkills, technicalSkills } from '@/lib/data/skills';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { mentorshipBenefits, mentorshipProcess } from '@/lib/data/mentorship';
import { socialLinks } from '@/lib/data/social_links';
import { hobbies } from '@/lib/data/hobbies';
import { testimonials } from '@/lib/data/testimonials';
import { faqs } from '@/lib/data/faq';
import { getVisibleItems } from '@/lib/utils/data';

export function getCompleteProfileData() {
  const visibleProjects = getVisibleItems(projects);
  const visibleCareer = getVisibleItems(careerItems);
  const visibleEducation = getVisibleItems(academicRecords);
  const visibleHobbies = getVisibleItems(hobbies);
  const visibleTestimonials = getVisibleItems(testimonials);
  const visibleSocials = getVisibleItems(socialLinks);

  return {
    profile: {
      ...profile,
      social_links: visibleSocials.map((link) => ({
        platform: link.platform,
        url: link.url,
        label: link.label,
      })),
    },
    projects: visibleProjects,
    skills: {
      technical: technicalSkills,
      soft: softSkills,
    },
    experience: visibleCareer,
    education: visibleEducation,
    mentorship: {
      benefits: mentorshipBenefits,
      process: mentorshipProcess,
    },
    hobbies: visibleHobbies,
    testimonials: visibleTestimonials,
    faq: faqs,
  };
}
