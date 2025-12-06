import { AcademicRecord } from '@/lib/types';

/**
 * Academic history records for Aghogho Meyoron
 * Source: docs/aghogho-meyoron.json (cleaned - removed id, profile_id, created_at)
 */
export const academicRecords: AcademicRecord[] = [
  {
    school: 'Sololearn Inc.',
    degree: 'Software Engineering Basics',
    start_year: 2017,
    end_year: 2017,
    achievements: [
      'Introduction to programming in C++: Building command line apps and terminal games using C++ as a means of skill development',
      'General problem solving using Python: Created algorithms to render help in fields spanning across Science and Day to Day living',
      'HTML5, CSS3 and JavaScript: Using HTML to build static and beautified web pages',
      'Backend Web Development with PHP and MySQL: Employed the use of PHP and MySQL in cooperation with previously attained Skills to develop Dynamic Web Pages',
    ],
    location: 'Remote',
    show: true,
    priority: 0,
  },
  {
    school: 'Flexpert iSystems (Flyte) Academy',
    degree: 'Advanced Backend Web Engineering',
    start_year: 2018,
    end_year: 2018,
    achievements: [
      'jQuery, XML, JSON, Ajax: Made use of Ajax Technologies to develop Web Solutions as a Backend Web Developer working collaboratively with a Co-Staff handling Frontend and UIX Designs',
      'MySQL and Database Administration: I functioned as the Database Administrator',
      'Server Administrator: I was put in charge of the server on which our projects where hosted, and also the general server on which the firm projects were hosted',
    ],
    location: 'Benin, Edo State, Nigeria',
    show: true,
    priority: 0,
  },
  {
    school: 'Mayor Tech Solutions, Warri',
    degree: 'Advanced Web Engineering',
    start_year: 2019,
    end_year: 2019,
    achievements: [
      'Bootstrap: Advanced to building beautiful web pages/sites using the Bootstrap',
      'PHP 7: Learnt effectively on the New APIs and functionalities offered by PHP 7 in building more secure and well optimized complex web programs',
      'Wordpress: Familiarized myself with building E-Commerce, Landing Page Apps and Blog Webapps using Wordpress for speed and efficiency',
      'VueJS: Made effective and proficient use of VueJS, a Javascript Framework, in building well optimized web applications at the front end',
      'Modern Web Design: Adopted the use of modern technologies for building robust and highly scalable and slick web applications using NuxtJS, Vuetify, VueSax',
    ],
    location: 'Delta State, Nigeria',
    show: true,
    priority: 0,
  },
  {
    school: 'Miva University',
    degree: 'Bachelor of Science in Computer Science',
    start_year: 2025,
    end_year: 2029,
    achievements: [],
    location: 'Lagos, Nigeria',
    show: true,
    priority: 0,
  },
];
