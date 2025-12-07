import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';

export const companyProjects: Project[] = [
  {
    slug: 'glover',
    name: 'Glover',
    description:
      'The Power of Digital service at your fingertips Giftcards, Crypto, Refill, Airtime2Cash etc. with effortless payments in a secured environment.',
    features: [
      'Giftcards',
      'Crypto',
      'Refill',
      'Airtime2Cash',
      'Effortless payments',
      'Secured environment',
    ],
    icons: [techIcons.NuxtJS, techIcons.TailwindCSS, techIcons.Laravel],
    type: 'web-app',
    owner: 'client',
    demo_link: 'https://gloverapp.co',
    repo_link: null,
    images: [cloudinaryImage.project('glover-landing-page.png')],
    show: true,
    priority: 99,
    is_featured: true,
  },
  {
    slug: 'eytan',
    name: 'Eytan',
    description:
      "Eytan is a hospital staff management system developed for tracking patients' hospital records and managing staff tasks. Please note that information about this project is protected by a non-disclosure agreement (NDA) from my previous employer.",
    features: ['Staff Management', 'Stock Management', 'Admin Console', 'Task schedule management'],
    icons: [techIcons.JavaScript, techIcons.PHP],
    type: 'other',
    owner: 'client',
    demo_link: null,
    repo_link: null,
    images: [],
    show: false,
    priority: 0,
  },
  {
    slug: 'joblinkup',
    name: 'JobLinkup',
    description:
      'JobLinkup is a job agency application that connects job seekers with employers by scraping jobs daily from verified sources and helping users map and find their desired positions. This platform was designed to be user-friendly and effective in connecting job seekers and employers.',
    features: [
      'Automated Self Database Management',
      'Web Scraping using Python',
      'Multi - Level Authentication. Seekers and Employers',
      'Utilized 3rd Party payment gateways',
      'Administrative Management',
    ],
    icons: [techIcons.VueJS, techIcons.jQuery, techIcons.PHP, techIcons.Python],
    type: 'api',
    owner: 'client',
    demo_link: null,
    repo_link: null,
    images: [],
    show: false,
    priority: 0,
  },
];
