# GitHub Copilot Instructions for Aghogho Meyoron Portfolio

## Project Overview

This is a NextJS-based portfolio application showcasing Meyoron Aghogho's professional career, projects, skills, and expertise. The portfolio is built with modern web technologies and follows industry best practices.

## Technology Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript
- **UI Framework**: React 19.2.0
- **Styling**: Tailwind CSS 4.0
- **Code Quality**: ESLint, Prettier

## Project Structure

```
/app                  # Next.js app directory (App Router)
/docs                 # Documentation and data files
  - aghogho-meyoron.json  # Portfolio data (profile, history, projects, skills, etc.)
  - PLAN.md           # Implementation plan phases
/public               # Static assets
```

## Key Features

1. **Hero Section**: Introduction with avatar, name, specializations, tagline, and CTAs
2. **Career History**: Timeline-based professional experience display
3. **Projects Showcase**: Categorized project listings with detailed views
4. **Skills & Expertise**: Technology proficiencies organized by categories (Frontend, Backend, Mobile, Database, Cloud, Other)
5. **Mentorship Section**: Metrics, reviews, and application form
6. **Articles & Blog**: Written content showcase
7. **Testimonials**: Social proof from colleagues and clients
8. **Contact Form**: Integrated with MongoDB and Telegram notifications
9. **Resume Builder**: Dynamic resume generation with template selection
10. **PWA Support**: Offline capabilities
11. **Theme Toggle**: Light/Dark mode switching
12. **SEO Optimization**: Comprehensive meta tags and structured data

## Coding Guidelines

### TypeScript

- Use strict TypeScript types for all components and functions
- Define interfaces for complex data structures (see `docs/aghogho-meyoron.json` for data models)
- Prefer type inference where possible but be explicit for function parameters and return types
- Use discriminated unions for variant types

### React & Next.js

- Use React 19 features including Server Components by default
- Implement Client Components only when necessary (use "use client" directive)
- Follow Next.js App Router conventions
- Use dynamic imports for code splitting large components
- Implement proper loading and error states
- Use Next.js built-in features (Image, Link, Metadata) appropriately

### Components

- Create reusable, composable components
- Follow atomic design principles (atoms, molecules, organisms)
- Use descriptive component names that reflect their purpose
- Keep components focused and single-responsibility
- Extract common patterns into shared components

### Styling

- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design approach
- Maintain consistent spacing, colors, and typography
- Use CSS variables for theme values (light/dark mode)
- Avoid inline styles unless absolutely necessary

### Data Management

- Source data from `docs/aghogho-meyoron.json` for portfolio content
- Implement type-safe data access patterns
- Use TypeScript files for structured data when appropriate
- Support Markdown processing (gray-matter) for rich content (projects, announcements)

### Forms & Interactions

- Implement form validation (client and server-side)
- Use ReCAPTCHA v3 for spam prevention
- Integrate MongoDB for data persistence
- Send notifications via Telegram for form submissions
- Provide clear error messages and loading states
- Ensure accessibility (ARIA labels, keyboard navigation)

### API Routes

- Secure API endpoints with custom authentication
- Implement time-based encryption for API access
- Return appropriate HTTP status codes
- Include error handling and validation
- Document API endpoints and their purposes

### Performance

- Optimize images (use Next.js Image component)
- Implement lazy loading for below-the-fold content
- Minimize bundle size through code splitting
- Use React.memo() for expensive components
- Implement proper caching strategies

### SEO & Accessibility

- Add comprehensive meta tags for all pages
- Use semantic HTML elements
- Implement proper heading hierarchy (h1-h6)
- Ensure color contrast meets WCAG standards
- Add alt text for images
- Support keyboard navigation
- Test with screen readers

### Testing & Quality

- Write unit tests for utility functions and components
- Test edge cases and error scenarios
- Use ESLint for code quality checks
- Format code with Prettier
- Follow the project's existing code style

## Data Models Reference

Key data structures from `docs/aghogho-meyoron.json`:

### Profile
- id, name, main_job_title, tagline_hero, persona_note, long_note
- about_biography, contact_email, contact_phone, contact_message
- profile_image_url, copyright information

### History
- **academic**: array of education records (school, degree, start_year, end_year, achievements, location, show, priority)
- **career**: array of work experience (company_name, role, start_date, end_date, description, location, duties, show, priority)

### Portfolio
- **projects**: array of project items (name, description, features, technologies_used, link, demo_link, image, repository, show, is_inhouse, priority)
- **articles**: array of article entries (title, summary, link, cover, platform, show, priority)

### Skills
- **categories**: array of skill categories (category_name, display_order, technologies array)
- **expertise**: array of expertise areas (title, note, icon_name, icon_color, show, priority)

### Social Links
- Array of social media profiles (name, url, icon, show, priority)

### Testimonials
- Array of testimonials (name, role, review, photo, bio, profile_link, rating, show, priority)

### Hobbies
- Array of hobbies (name, color, percentage, show, priority)

### Badges
- Array of badges (name, icon_name)

## Priority Fields

Many data structures include `show` and `priority` fields:
- **show**: Boolean indicating if item should be displayed
- **priority**: Integer for sorting (higher priority = more prominent)

## Best Practices

1. **Read the data**: Always reference `docs/aghogho-meyoron.json` for accurate content structure
2. **Respect the data model**: Don't add fields that don't exist in the JSON
3. **Filter properly**: Use `show: true` to filter displayable items
4. **Sort by priority**: Higher priority items should appear first
5. **Type safety**: Create TypeScript interfaces matching the JSON structure
6. **Responsive design**: Ensure all components work on mobile, tablet, and desktop
7. **Theme support**: Components should work in both light and dark modes
8. **Performance**: Optimize for fast loading and smooth interactions
9. **Accessibility**: Make the portfolio usable for everyone
10. **SEO**: Ensure good search engine visibility

## Common Tasks

### Adding a New Section
1. Review the data in `docs/aghogho-meyoron.json`
2. Create TypeScript interfaces for the data structure
3. Build the component with proper typing
4. Implement responsive layout
5. Add theme support (light/dark)
6. Test accessibility
7. Add SEO metadata

### Styling Components
1. Use Tailwind utility classes
2. Follow mobile-first approach
3. Use theme colors from CSS variables
4. Ensure consistent spacing with Tailwind's spacing scale
5. Test in both light and dark modes

### Working with Forms
1. Implement client-side validation
2. Add ReCAPTCHA v3
3. Create API route for submission
4. Store in MongoDB
5. Send Telegram notification
6. Show success/error feedback

## Reference Links

- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

## Notes

- Always maintain backward compatibility with existing features
- Test changes thoroughly before committing
- Follow the project's git workflow
- Update documentation when adding new features
- Keep security in mind, especially for API routes and form handling
