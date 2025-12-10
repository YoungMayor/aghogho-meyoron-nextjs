import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';

export const jsPackages: Project[] = [
  {
    slug: 'prunejs',
    name: 'PruneJS',
    description:
      'A powerful, configurable CLI tool designed to enhance the cleanliness and maintainability of JavaScript and TypeScript projects by identifying and removing unused code (dead code).',
    features: [
      'Smart scanning for unused exports and non-exported declarations.',
      'Safe automatic removal of unused code using syntax-aware analysis.',
      'Configurable include/exclude directories.',
      'Safety checks to prevent scanning excluded directories like node_modules.',
      'Generates comprehensive Markdown reports on codebase health.',
    ],
    icons: [techIcons.JavaScript, techIcons.TypeScript, techIcons.NODEJS, techIcons.npm],
    owner: 'package',
    type: 'package',
    demo_link: 'https://www.npmjs.com/package/prunejs',
    repo_link: 'https://github.com/YoungMayor/prunejs',
    images: [cloudinaryImage.jsCodeshot('prunejs')],
    show: true,
    priority: 0,
  },
  {
    slug: 'js-pkg-base64',
    name: '@youngmayor/base64',
    description:
      'A lightweight and efficient utility package for Base64 encoding and decoding operations.',
    features: [
      'Fast Base64 encoding and decoding.',
      'Simple and intuitive API.',
      'Lightweight with minimal dependencies.',
    ],
    icons: [techIcons.JavaScript, techIcons.TypeScript, techIcons.NODEJS, techIcons.npm],
    owner: 'package',
    type: 'package',
    demo_link: 'https://www.npmjs.com/package/@youngmayor/base64',
    repo_link: 'https://github.com/YoungMayor/base64',
    images: [cloudinaryImage.jsCodeshot('base64')],
    show: true,
    priority: 0,
  },
];
