import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';

export const personalStartups: Project[] = [
  {
    slug: 'podici',
    name: 'Podici',
    description:
      'A multi-vendor e-commerce application that allows vendors and customers to interact and make transactions. I was responsible for the development and maintenance of this platform, utilizing my skills in backend engineering and web development. Please note that information about this project is protected by a non-disclosure agreement (NDA).',
    features: [
      'Stock management',
      'Public vendor profiles',
      'Integrity rating on vendors and products',
      'Order management',
      'User wallets and payment management',
    ],
    icons: [
      techIcons.VueJS,
      techIcons.NuxtJS,
      techIcons.Vuetify,
      techIcons.Laravel,
      techIcons.NODEJS,
      techIcons.RestAPI,
    ],
    type: 'web-app',
    owner: 'client',
    demo_link: null,
    repo_link: null,
    images: [],
    show: false,
    priority: 0,
  },
  {
    slug: 'paylighter',
    name: 'PayLighter',
    description:
      'A fintech application that enables unrestricted and decentralized fund payments. I was responsible for the development and maintenance of this platform, utilizing my skills in backend engineering and web development. Please note that information about this project is protected by a non-disclosure agreement (NDA).',
    features: ['Payment management', 'User wallets', 'Fund transfer', 'Payment requests'],
    icons: [
      techIcons.VueJS,
      techIcons.NuxtJS,
      techIcons.Vuetify,
      techIcons.Laravel,
      techIcons.NODEJS,
      techIcons.RestAPI,
    ],
    type: 'other',
    owner: 'client',
    demo_link: null,
    repo_link: null,
    images: [],
    show: false,
    priority: 0,
  },
  {
    slug: 'saleshouse',
    name: 'SalesHouse',
    description: 'Buy and sell pre-loved goods, connect with others, and find your next treasure.',
    features: [
      'Auction based sales',
      'AI powered pricing tool',
      'in-app chat between sellers and buyers',
    ],
    icons: [techIcons.NextJS, techIcons.TailwindCSS, techIcons.GenKit],
    type: 'other',
    owner: 'personal',
    demo_link: 'https://saleshouse.mayrlabs.com',
    repo_link: null,
    images: [cloudinaryImage.project('saleshouse-homepage')],
    show: true,
    priority: 0,
  },
];
