import { Project } from '@/lib/types';
import { cloudinaryImage } from '@/lib/utils/helpers';
import { techIcons } from '../../icons';

export const goCLIs: Project[] = [
  {
    slug: 'secureflow',
    name: 'SecureFlow CLI',
    description:
      'A CLI application for encrypting and decrypting sensitive files (like Flutter private assets) for secure CI/CD pipelines. It uses AES-256-CBC encryption to keep secrets safe.',
    features: [
      'Strong AES-256-CBC encryption with PBKDF2.',
      'Fast and lightweight single binary.',
      'Cross-platform support (Linux, macOS, Windows).',
      'CI/CD ready with non-interactive mode.',
      'Simple YAML-based configuration.',
      'Detailed encryption reports.',
    ],
    icons: [techIcons.Go, techIcons.GitHubActions],
    owner: 'package',
    type: 'cli',
    demo_link: null,
    repo_link: 'https://github.com/MayR-Labs/secureflow-go',
    images: [cloudinaryImage.goCodeshot('secureflow')],
    show: true,
    priority: 0,
  },
  {
    slug: 'envdoc',
    name: 'EnvDoc',
    description:
      'A powerful CLI tool for managing, validating, and transforming environment variable files (`.env`). It helps keep environment configurations in sync and documented.',
    features: [
      'Documentation Generation: Create example files and schemas from .env.',
      'Auditing: Find duplicate keys and missing variables.',
      'Synchronization: Keep .env files in sync across environments.',
      'Security: Encrypt/decrypt support.',
      'Conversion between .env, JSON, and YAML.',
      'Validation against JSON schemas.',
    ],
    icons: [techIcons.Go, techIcons.GitHubActions],
    owner: 'package',
    type: 'cli',
    demo_link: null,
    repo_link: 'https://github.com/MayR-Labs/envdoc-go',
    images: [cloudinaryImage.goCodeshot('envdoc')],
    show: true,
    priority: 0,
  },
];
