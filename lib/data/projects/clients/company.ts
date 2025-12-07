import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';

export const companyProjects: Project[] = [
  {
    slug: 'glover',
    name: 'Glover',
    description:
      'As a Senior Backend Engineer at Glover, a leading Nigerian Fintech, I played a pivotal role in optimizing and securing the platform which offers services ranging from gift card trading to crypto payments. I led the migration of the legacy codebase from Laravel v7 to v12 with zero downtime, significantly boosting system performance and maintainability. My work focused on high-impact features including a custom login security system with anomaly detection, a high-speed rewards distribution engine, and a Google OCR-powered gift card validation system utilizing encryption for data security. I also architected a comprehensive Brand Ambassador dashboard and a fraud-resistant customer reward system, directly contributing to increased user engagement and platform trust.',
    features: [
      'Advanced Login Security & Fraud Detection',
      'High-Volume Holiday Rewards System',
      'Brand Ambassador Management Dashboard',
      'Secure Giftcard OCR Validation',
      'Automated Customer Rewards Engine',
      'Virtual Card Issuance System',
      'Zero-Downtime Infrastructure Upgrade',
    ],
    icons: [
      techIcons.Laravel,
      techIcons.PostgreSQL,
      techIcons.MariaDB,
      techIcons.Redis,
      techIcons.NODEJS,
      techIcons.Postman,
      techIcons.NuxtJS,
      techIcons.TailwindCSS,
    ],
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
