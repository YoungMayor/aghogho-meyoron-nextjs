import { Project } from '@/lib/types';
import { companyProjects } from './projects/clients/company';
import { personalStartups } from './projects/personal/startups';
import { legacyProjects } from './projects/personal/legacy';
import { personalWebApps } from './projects/personal/web-apps';
import { clientPortfolios } from './projects/clients/portfolios';
import { electronOpensourceApps } from './projects/personal/electron-opensource-apps';
import { dartPackages, flutterPackages } from './projects/personal/dart-and-flutter-packages';
import { jsPackages } from './projects/personal/js-packages';
import { goCLIs } from './projects/personal/go-cli';

export const projects: Project[] = [
  ...companyProjects,
  ...personalWebApps,
  ...clientPortfolios,
  ...personalStartups,
  ...electronOpensourceApps,
  ...dartPackages,
  ...flutterPackages,
  ...jsPackages,
  ...goCLIs,
  // ...legacyProjects, // I have more than enough projects now
];

export const featuredProjects: Project[] = projects.filter(
  (project) => project.is_featured === true
);
