import { Skill } from '@/lib/types';
import {
  languagesIcons,
  frameworksIcons,
  librariesIcons,
  databasesIcons,
  devopsIcons,
  toolsIcons,
  otherIcons,
} from './icons';

export const skills: Skill[] = [
  {
    name: 'Languages',
    description: null,
    type: 'tech',
    icons: Object.values(languagesIcons),
    show: true,
    priority: 1,
  },
  {
    name: 'Frameworks',
    description: null,
    type: 'tech',
    icons: Object.values(frameworksIcons),
    show: true,
    priority: 2,
  },
  {
    name: 'Libraries',
    description: null,
    type: 'tech',
    icons: Object.values(librariesIcons),
    show: true,
    priority: 3,
  },
  {
    name: 'Databases',
    description: null,
    type: 'tech',
    icons: Object.values(databasesIcons),
    show: true,
    priority: 4,
  },
  {
    name: 'Cloud & DevOps',
    description: null,
    type: 'tech',
    icons: Object.values(devopsIcons),
    show: true,
    priority: 5,
  },
  {
    name: 'Tools',
    description: null,
    type: 'tech',
    icons: Object.values(toolsIcons),
    show: true,
    priority: 6,
  },
  {
    name: 'Design',
    description: null,
    type: 'tech',
    icons: [toolsIcons.Figma, toolsIcons.Canva],
    show: true,
    priority: 7,
  },
  {
    name: 'AI / Data Science',
    description: null,
    type: 'tech',
    icons: [
      otherIcons.GoogleGemini,
      librariesIcons.Pandas,
      librariesIcons.NumPy,
      librariesIcons.ScikitLearn,
      librariesIcons.TensorFlow,
      librariesIcons.PyTorch,
    ],
    show: true,
    priority: 8,
  },

  {
    name: 'Technical Strategy',
    description:
      "I don't just solve tickets; I dismantle legacy bottlenecks. I specialise in mapping technical debt and architecting scalable migrations that align with long-term business growth.",
    type: 'soft',
    icons: [],
    show: true,
    priority: 0,
  },
  {
    name: 'Open Source Advocacy',
    description:
      'Author of multiple Dart and Go packages. I focus on Developer Experience (DX), creating tools that simplify validation, state management, and internationalisation for the global dev community.',
    type: 'soft',
    icons: [],
    show: true,
    priority: 0,
  },
  {
    name: 'Web Engineer',
    description:
      'As a Web Engineer, I architect and implement scalable web applications, translating complex requirements into clean, efficient, and maintainable code. My focus is on delivering user-centric solutions that drive tangible business results through optimized performance and seamless integration.',
    type: 'soft',
    icons: [],
    show: true,
    priority: 0,
  },
];

export const technicalSkills = skills.filter((s) => s.type === 'tech' && s.show);

export const softSkills = skills.filter((s) => s.type === 'soft' && s.show);
