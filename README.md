# Aghogho Meyoron Portfolio

A sophisticated, highly customizable, and SEO-optimized portfolio built with Next.js 16. This project showcases professional history, projects, mentorship, and more, featuring a robust internal API and seamless integrations.

## Overview

This portfolio is designed to be a central hub for my professional identity, offering a rich user experience with light/dark mode, offline support (PWA), and dynamic content management via Markdown and TypeScript data files.

## Features

### Core Sections

- **Hero**: Captivating introduction with avatar, name, specializations, tagline, and CTAs (Resume, Contact, Socials).
- **Get to Know Me**: Bio and proficiency showcase using DevIcons.
- **Career History**: A beautiful, timeline-based display of professional experience.
- **Projects**: Comprehensive showcase of JS/Dart packages, apps, API solutions, and open-source contributions.
  - Supports detailed views via Markdown (gray-matter).
  - Categorized display.
- **Mentorship**: Metrics, impact, reviews, and an application form.
- **Articles**: A section for written content.
- **Testimonials**: Social proof from colleagues and clients.
- **Contact**: Functional contact form with ReCAPTCHA v3.
- **Footer**: Professional footer with relevant links.

### Advanced Features

- **Customizable Resume**: `/resume` page loading data dynamically. Users can select templates and configure visible data before printing.
- **Announcements**: `/announcement` page powered by Markdown files for news and updates.
- **Theming**: Automatic Light/Dark mode switching.
  - Light Mode: Black primary color.
  - Dark Mode: White primary color.
- **PWA & Offline Support**: Fully optimized for performance and offline access.
- **SEO**: Comprehensive SEO optimization for all pages.

### Integrations & Backend

- **Forms**: Mentorship and Contact forms integrated with:
  - **MongoDB**: For persistent storage.
  - **Telegram**: For instant notifications.
  - **ReCAPTCHA v3**: For spam prevention.
- **Internal API**: Secure endpoints (`/api/**`) to expose portfolio data to other applications.
  - **Security**: Custom authentication using a secret key and time-based encryption (Header verification).

## Tech Stack

- **Framework**: Next.js 16.0.7 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB (for form submissions)
- **Data Source**: TypeScript files and Markdown files with gray-matter
- **PWA**: Service Worker for offline support
- **Integrations**: Telegram Bot API, Google ReCAPTCHA v3

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

4. Fill in the environment variables in `.env.local`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Build for production:

```bash
npm run build
```

### Lint

Check code quality:

```bash
npm run lint
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with theme variables
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions and data
│   ├── data/            # Data files (TypeScript)
│   ├── utils/           # Utility functions
│   ├── db/              # Database connections
│   └── types/           # TypeScript type definitions
├── content/             # Markdown content
│   ├── projects/        # Project detail pages
│   └── announcements/   # Announcement pages
├── public/              # Static assets
│   ├── icons/          # App icons
│   ├── manifest.json   # PWA manifest
│   └── sw.js           # Service worker
└── docs/               # Documentation
    └── aghogho-meyoron.json  # Portfolio data reference
```

## Data Structure

Data is managed via structured TypeScript files for easy maintenance and type safety:

- `academic_records.ts`
- `career_items.ts`
- `projects.ts`
- `skills.ts`
- ...and others.

## Endpoints

- `/` - Home
- `/projects` - Project Listing
- `/projects/{slug}` - Project Details
- `/mentorship` - Mentorship Info & Application
- `/contact` - Contact Page
- `/resume` - Resume Builder/View
- `/announcement` - Announcements Listing
- `/announcement/{slug}` - Announcement Details
- `/api/**` - Internal API for data access (Profile, History, Projects, etc.)

## Security

The internal API is secured via a custom mechanism:

1. **Secret Key**: Stored in `.env`.
2. **Client**: Encrypts current timestamp using the key.
3. **Header**: Sends encrypted token in request header.
4. **Server**: Decrypts and verifies timestamp validity.
5. **Failure**: Returns `401 Unauthorized` if invalid.
