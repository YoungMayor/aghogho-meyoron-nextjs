import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';
import { segments, stackRoles } from '../constants';

const dockyardImage = (filename: string) =>
  `https://dockyard.mayrlabs.com/screenshots/${filename}.png`;

export const electronOpensourceApps: Project[] = [
  {
    slug: 'dockyard',
    name: 'DockYard',
    description:
      'A privacy-first desktop workspace for all your web apps. It serves as an open-source alternative to Rambox, offering session isolation, auto-hibernation, and full customization to streamline your workflow.',
    features: [
      'Session Isolation: Keep your accounts separate and secure.',
      'Auto-Hibernation: Save memory by suspending inactive apps.',
      'Full Customization: Tailor the workspace to your needs.',
      'Multiple Profiles: Manage different sets of apps easily.',
      'Tab Tiling & Layout Control: Organize your workspace efficiently.',
    ],
    icons: [
      techIcons.HTML5,
      techIcons.CSS3,
      techIcons.JavaScript,
      techIcons.TypeScript,
      techIcons.React,
      techIcons.TailwindCSS,
      techIcons.ElectronJS,
      techIcons.NODEJS,
      techIcons.JSON,
    ],
    segment: [segments.productivity, segments.opensource],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://dockyard.mayrlabs.com',
    repo_link: 'https://github.com/MayR-Labs/dockyard',
    images: [
      cloudinaryImage.project('dockyard'),
      dockyardImage('add-app'),
      dockyardImage('app-layout'),
      dockyardImage('create-workspace'),
      dockyardImage('customise-app-1'),
      dockyardImage('customise-app'),
      dockyardImage('customise-theme'),
      dockyardImage('multi-profile'),
      dockyardImage('responsiveness-setting'),
      dockyardImage('select-app'),
      dockyardImage('switch-workspace'),
    ],
    show: true,
    priority: 0,
    is_featured: true,
  },
];
