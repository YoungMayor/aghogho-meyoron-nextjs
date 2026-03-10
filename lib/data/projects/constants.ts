export const segments = {
  fintech: 'Fintech & Enterprise',
  ai: 'Artificial Intelligence',
  devtools: 'Developer Tools',
  opensource: 'Open Source',
  package: 'Package/Library',
  edtech: 'EdTech & Learning',
  healthtech: 'Health Tech',
  ecommerce: 'E-commerce & Retail',
  community: 'Community & Social',
  productivity: 'Desktop & Productivity',
  hr: 'HR & Recruitment',
  api: 'API & Microservices',
  bot: 'Bot & Integrations',
  data: 'Data Visualization',
  gaming: 'Entertainment & Gaming',
  media: 'Streaming & Media',
  portfolio: 'Client Portfolio',
} as const;

export type ProjectSegment = (typeof segments)[keyof typeof segments];

export const stackRoles = {
  frontend: 'Frontend Developer',
  backend: 'Backend Engineer',
  fullstack: 'Full-Stack Developer',
  mobile: 'Mobile Developer',
  lead: 'Lead Developer',
  creator: 'Creator',
  maintainer: 'Maintainer',
  designer: 'UI/UX Designer',
} as const;

export type ProjectRole = (typeof stackRoles)[keyof typeof stackRoles];
