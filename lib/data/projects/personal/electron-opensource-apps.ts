import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';

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
    icons: [techIcons.ElectronJS, techIcons.React, techIcons.TypeScript, techIcons.TailwindCSS],
    type: 'desktop-app',
    owner: 'personal',
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
