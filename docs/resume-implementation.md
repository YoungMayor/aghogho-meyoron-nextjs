# Resume Page Implementation Guide

This document details the implementation of the dynamic Resume Page, including the Resume Viewer, Template Selection, Data Configuration, and Export features.

## 1. Overview

The Resume Page (`/resume`) has been transformed from a static view into a dynamic **Resume Builder**. This allows the user (owner) or a viewer to customize the resume content and layout before exporting it. The implementation focuses on client-side flexibility while leveraging the existing centralized portfolio data.

## 2. Architecture

The implementation follows a **Builder Pattern** with three main components:

1**ResumeBuilder**: The container component that manages state and orchestration.
2**ResumeConfigPanel**: The sidebar interface for user customization.
3**ResumePreview**: The display area that renders the selected template with filtered data.

### State Management

We use React's `useState` to manage the `ResumeConfig` object, which persists to `localStorage`. This ensures that user preferences (selected template, hidden items) are saved across sessions.

```typescript
interface ResumeConfig {
  templateId: 'classic' | 'modern' | 'minimal' | 'executive';
  showSections: {
    experience: boolean;
    education: boolean;
    // ...other sections
  };
  hiddenItemIds: string[]; // IDs of specific items to hide
  customSummary?: string; // Override for the bio/summary
}
```

## 3. Implemented Features

### 3.1 Resume Viewer Mode

- **Layout**: A clean, split-screen interface with a configuration sidebar (collapsible) and a print-optimized preview area.
- **Responsiveness**: The builder is mobile-responsive, while the preview scales to fit the screen but maintains A4/Letter proportions concept.

### 3.2 Template Selection

We implemented a **Strategy Pattern** for templates. The `ResumePreview` component dynamically renders one of several template components based on `config.templateId`.

Available Templates:

- **Classic**: The original design, balanced with a dark sidebar and clean white main area.
- **Modern**: A professional design featuring a bold colored header, timeline-style experience, and visually distinct skill badges.
- **Minimal**: A typography-focused, single-column layout with no background colors, ideal for strict ATS parsing or academic use.
- **Executive**: A dense, two-column layout optimized for fitting a lot of information into a single page.

### 3.3 Data Configuration

The **ResumeConfigPanel** provides granular control over the content:

- **Section Toggles**: Users can completely hide sections (e.g., "Projects" or "Hobbies") if they are not relevant for a specific job application.
- **Item Selection**: Inside each section (like Experience), users can uncheck specific roles to hide them. This is achieved by maintaining a list of `hiddenItemIds` and filtering the data in `ResumePreview`.
- **Custom Summary**: Users can override the default LinkedIn-style bio with a custom summary tailored for the specific resume.

### 3.4 Export & Print

- **Print Optimization**: All templates are built with standard Tailwind utility classes but include specific `print:` modifiers (e.g., `print:shadow-none`, `print:bg-white`).
- **Browser Print**: We utilize the native `window.print()` functionality, which provides the most reliable "Save as PDF" experience by rendering the DOM exactly as styled. The sidebar is automatically hidden during print via CSS (`print:hidden`).

## 4. Key Components

### `ResumeBuilder.tsx`

The entry point. It fetches data using `usePortfolioData`, handles loading/error states, and initializes the configuration from localStorage.

### `ResumeConfigPanel.tsx`

Handles all user implementation. It uses a Tabbed interface to separate "Template" selection from "Content" configuration. It uses Shadcn UI components (Switch, Checkbox, Accordion) for a polished look.

### `ResumePreview.tsx`

Responsible for data processing. It derives `filteredData` by applying the `ResumeConfig` rules to the raw `PortfolioData`. This ensures that templates only receive data that should actually be displayed.

```typescript
const filteredData = useMemo(() => {
  return {
    ...data,
    careerHistory: config.showSections.experience
      ? data.careerHistory.filter((item) => !config.hiddenItemIds.includes(item.id))
      : [],
    // ...
  };
}, [data, config]);
```

## 5. File Structure

- `src/app/resume/page.tsx`: Route entry point.
- `src/components/resume/`:
  - `ResumeBuilder.tsx`: Main logic.
  - `ResumeConfigPanel.tsx`: Sidebar UI.
  - `ResumePreview.tsx`: Preview logic.
  - `templates/`: Directory for template components.
    - `ClassicTemplate.tsx`
    - `ModernTemplate.tsx`
    - `MinimalTemplate.tsx`
    - `ExecutiveTemplate.tsx`
- `src/lib/resume-utils.ts`: Shared helper functions for date formatting.
- `src/types/resume.ts`: TypeScript definitions for the configuration state.
