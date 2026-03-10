import { Project } from '@/lib/types';
import { techIcons } from '../../icons';
import { cloudinaryImage } from '@/lib/utils/helpers';
import { segments, stackRoles } from '../constants';

export const jsPackages: Project[] = [
  {
    slug: 'mayrlabs-genesis',
    name: '@mayrlabs/genesis',
    description:
      'Interactive CLI to fast-track your project setup. Spin up a production-ready environment in seconds without manually copying configuration files.',
    features: [
      'Automates linting, formatting, testing framework configuration.',
      'Interactive CLI experience.',
    ],
    icons: [techIcons.JavaScript, techIcons.TypeScript, techIcons.NODEJS, techIcons.npm],
    segment: [segments.devtools, segments.opensource, segments.package, segments.cli],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://www.npmjs.com/package/@mayrlabs/genesis',
    repo_link: 'https://github.com/MayR-Labs/mayrlabs-js',
    images: [],
    show: true,
    priority: 0,
  },
  {
    slug: 'mayrlabs-prunejs',
    name: '@mayrlabs/prunejs',
    description:
      'A powerful, configurable CLI tool designed to keep your JavaScript and TypeScript projects clean and maintainable. It scans your codebase to detect unused files, functions, classes, and exports, and can automatically remove them for you.',
    features: [
      'Smart Scanning: Detects unused exports and non-exported declarations (dead code).',
      'Safe Fixes: Automatically removes unused code while preserving structure using brace counting and syntax awareness.',
      'Configurable: Support for includeDirs (whitelist) and excludeDirs (blacklist) for precise control.',
      'Safety Checks: Warns you if you attempt to scan typically excluded directories (like node_modules).',
      'Detailed Reports: Generates comprehensive Markdown reports in .mayrlabs/prunejs/reports/ for detailed analysis.',
    ],
    icons: [techIcons.JavaScript, techIcons.TypeScript, techIcons.NODEJS, techIcons.npm],
    segment: [segments.devtools, segments.opensource, segments.package, segments.cli],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://www.npmjs.com/package/@mayrlabs/prunejs',
    repo_link: 'https://github.com/MayR-Labs/mayrlabs-js',
    images: [],
    show: true,
    priority: 0,
  },
  {
    slug: 'mayrlabs-debugger',
    name: '@mayrlabs/debugger',
    description:
      'A lightweight, environment-aware debugging utility for TypeScript applications. It provides structured logging with timestamps, log levels, color-coded output (in supported environments), and execution timing capabilities.',
    features: [
      'Environment Awareness: Helper methods to log only in development environments.',
      'Log Levels: Support for log, info, warn, error, and debug.',
      'Custom Colors: Support for custom hex colors using .custom().',
      'Namespaces: Support for organizing logs with namespaces.',
      'Execution Timing: timeBox utility to measure and log the duration of async operations.',
    ],
    icons: [techIcons.TypeScript, techIcons.NODEJS, techIcons.npm],
    segment: [segments.devtools, segments.opensource, segments.package],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://www.npmjs.com/package/@mayrlabs/debugger',
    repo_link: 'https://github.com/MayR-Labs/mayrlabs-js',
    images: [],
    show: true,
    priority: 0,
  },
  {
    slug: 'mayrlabs-telegram-service',
    name: '@mayrlabs/telegram-service',
    description:
      'A powerful, abstract Telegram bot service wrapper for MayR Labs applications. This package simplifies the creation of Telegram notification services by handling bot creation, error handling, and message dispatching.',
    features: [
      'Abstract Service Pattern: Easily create new notification services by extending TelegramService.',
      'Environment Driven: Configured via environment variables for security and flexibility.',
      'Built-in CLI: Interactive CLI tool to generate new service classes and send test messages.',
      'Robust Error Handling: Integrated with @mayrlabs/debugger for consistent logging.',
    ],
    icons: [techIcons.TypeScript, techIcons.NODEJS, techIcons.npm],
    segment: [segments.devtools, segments.opensource, segments.package, segments.cli],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://www.npmjs.com/package/@mayrlabs/telegram-service',
    repo_link: 'https://github.com/MayR-Labs/mayrlabs-js',
    images: [],
    show: true,
    priority: 0,
  },
  {
    slug: 'mayrlabs-web-icon',
    name: '@mayrlabs/web-icon',
    description:
      'A framework-agnostic icon package for React, Vue, and Next.js, supporting Simple Icons, Dev Icons, Local, and Remote icons.',
    features: [
      'Framework agnostic (React, Vue, Next.js).',
      'Supports Simple Icons and Dev Icons natively.',
    ],
    icons: [techIcons.TypeScript, techIcons.React, techIcons.VueJS, techIcons.npm],
    segment: [segments.devtools, segments.opensource, segments.package],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://www.npmjs.com/package/@mayrlabs/web-icon',
    repo_link: 'https://github.com/MayR-Labs/mayrlabs-js',
    images: [],
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
    segment: [segments.devtools, segments.opensource, segments.package],
    stack_role: [stackRoles.creator, stackRoles.maintainer],
    demo_link: 'https://www.npmjs.com/package/@youngmayor/base64',
    repo_link: 'https://github.com/YoungMayor/base64',
    images: [cloudinaryImage.jsCodeshot('base64')],
    show: true,
    priority: 0,
  },
];
