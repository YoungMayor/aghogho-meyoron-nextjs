# Aghogho Meyoron - Software Architect & Engineer Portfolio

A sophisticated, highly scalable, and privacy-first engineering portfolio built with **Next.js 16, TypeScript, and Tailwind CSS v4**. Designed not just as a static site, but as a fully fleshed out web application complete with internal APIs, Markdown-driven data structures, automated SEO schemas, a high-fidelity Next/Previous routing implementation, and offline Progressive Web App (PWA) capabilities.

## Technical Philosophy

This repository is architected to showcase uncompromising engineering rigor. From defining dynamic type layers over data structures to employing `gray-matter` for parsing external markdown files without relying on heavy CMS frameworks, the portfolio is built to be brutally efficient, self-contained, and structurally scalable.

### 🔐 Privacy by Design

The architecture explicitly isolates sensitive data (such as direct mobile contact) ensuring complete PWA and web environment privacy.

### ⚡ Architectural Performance

- **PWA Ready:** Leverages native service workers for robust offline caching.
- **Zero-Layout-Shift (ZLS):** All images and graphical layers are constrained implicitly.
- **Micro-Structured Data:** Generates dynamic LDAP + JSON-LD schemas automatically across projects, career milestones, and article pages.

## Key Features

- **Careers Subsystem (`/careers`):**
  - Iteratively parses a multi-layered TS definition dictionary.
  - Dynamically routes to `/careers/[slug]` with an intelligent fallback system. If `.md` role files exist in `/lib/data/content/career/`, it parses the `gray-matter`. Otherwise, it falls back flawlessly to array-based rendering.
- **Projects Data-Layer (`/projects`):**
  - Consistently categorized via heavily typed segments (Open Source, Client, Go, TS).
  - Dynamically merges inference algorithms linking `Languages`, `Frameworks`, and `Databases` directly from `lib/data/icons.ts`.
- **Dynamic Resume Builder (`/resume`):**
  - Instantaneous, strictly typed resume builder that pulls deeply nested component arrays to let users structure and customize their PDF exports.
- **Custom Internal API:**
  - Secure endpoints (`/api/**`) exposing isolated public data payloads to allowed clients.
  - Secured via an immutable Time-Based Timestamp signature validation over a shared secret key header.

## Tech Stack Overview

- **Core Framework:** Next.js 16.0.7 (App Router), React 19
- **Typing Engine:** TypeScript 5
- **Styling:** Tailwind CSS 4, Radix UI Primitives, Lucide-React
- **Database (Forms):** MongoDB (Mongoose)
- **External Integration:** Telegram Bot API (Instantaneous form notifications), Google ReCAPTCHA v3
- **DevOps:** Prettier, ESLint

## Local Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation Steps

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Spin up environment variables based on `.env.example`:

```bash
cp .env.example .env.local
```

_(Ensure MongoDB and ReCAPTCHA API keys are populated to successfully test the form mutations.)_

4. Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Testing & Linting

I enforce strict TS validation prior to any build cycle:

```bash
# Validate TypeScript compliance
npx tsc --noEmit

# Run Linter
npm run lint

# Compile for Production
npm run build
```

## Application Structure

```
├── app/                      # App Router core (Dynamic Routing, API endpoints)
│   ├── careers/              # Career Timeline, Detail Views & Markdown fallback layers
│   ├── projects/             # Projects ecosystem & Detailed Views
│   ├── api/                  # Secured data-exposure layer
│   └── page.tsx              # Index Aggregate
├── components/               # Granular React Components
│   ├── features/             # Business Logic UI (Filters, Timeline iterators, Cards)
│   ├── layout/               # High Order layout constructs (Header, Footer)
│   ├── sections/             # Distinct visual chunks invoked by layout pages
│   └── ui/                   # Reusable, stateless UI blocks
├── lib/                      # Core Logic & Utilities
│   ├── data/                 # SSOT (Single Source of Truth) data dictionaries (.ts)
│   │   └── content/          # Markdown documents (Careers, Projects, Announcements)
│   └── utils/                # Schema generators, Markdown parsers, debounce hooks
└── public/                   # Static and Service Worker execution layers
```

## Maintainer

Built and strictly architected by **Aghogho Meyoron**.
_Designed to establish robust, auditable infrastructure._
