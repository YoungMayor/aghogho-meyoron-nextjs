import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';

// Add ifeoma, fortune, foke, idara, ada
export const clientPortfolios: Project[] = [
  {
    slug: 'esther-ubeng',
    name: 'Esther Idara Ubeng | Senior Product Manager',
    description:
      'A professional portfolio for a visionary Senior Product Manager and Scrum Master. The site highlights her extensive experience in driving impactful product strategies, leading agile teams, and her dedication to mentoring aspiring tech professionals.',
    features: [
      'Product Lifecycle Management',
      'Agile & Scrum Leadership',
      'Mentorship Program Integration',
      'Project Case Studies',
      'Professional Blog',
    ],
    icons: [techIcons.React, techIcons.NextJS, techIcons.TailwindCSS, techIcons.Netlify],
    type: 'portfolio',
    owner: 'client',
    demo_link: 'https://estherubeng.netlify.app',
    repo_link: null,
    images: [cloudinaryImage.portfolio('esther-ubeng.png')],
    show: true,
    priority: 10,
    is_featured: true,
  },
];
