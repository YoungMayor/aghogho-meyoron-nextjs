# Codebase Audit Report — `aghogho-meyoron-nextjs`

> **Reviewer:** Senior Software Engineer, Perfectionist, Certified Code Curmudgeon  
> **Date:** 2026-03-12  
> **Verdict:** *Promising skeleton, questionable flesh.*

---

## Executive Summary

The architecture is solid enough that you clearly know *what* you're doing — Next.js App Router, Zod validation, Mongoose models, Telegram notifications, structured data, rate limiting. You've read the docs. You have opinions. That's the good news.

The bad news: you've committed at least one **credential-exposure vulnerability that would make a security intern wince**, you've written a hand-rolled Markdown parser when you already installed `react-markdown`, you've defined the same types in two different files and left them to diverge in silence, and you've scattered `priority: 0` on every single data item as if the field is purely decorative. There are also enough stale comments, dead code, and copy-paste scars to keep a forensic archaeologist busy.

This report covers findings from every file in the repository. They're organized from "call a lawyer" to "mildly annoying."

---

## Severity Scale

| Icon | Level | Description |
|------|-------|-------------|
| 🔴 | **CRITICAL** | Security vulnerability or runtime breakage |
| 🟠 | **HIGH** | Correctness, data integrity, or architectural flaw |
| 🟡 | **MEDIUM** | Code quality, maintainability, or logic issue |
| 🔵 | **LOW** | Style, naming, or minor inconsistency |

---

## 🔴 CRITICAL

### 1. You Published Your Server Secret to the Browser

**File:** `lib/env/client.ts`, `.env.example`

```ts
// lib/env/client.ts
NEXT_PUBLIC_INTERNAL_API_SECRET: z.string(),
```

```bash
# .env.example
NEXT_PUBLIC_INTERNAL_API_SECRET=your_secret_key_here_minimum_32_characters
```

Any variable prefixed `NEXT_PUBLIC_` is **bundled into the client-side JavaScript and sent to every visitor's browser.** This is Next.js 101.

The entire authentication scheme — encrypting a timestamp with AES-256-CBC — exists to prevent unauthorized callers from hitting your API. But because the secret is public, *anyone* can open DevTools, grab `NEXT_PUBLIC_INTERNAL_API_SECRET` from `window.__NEXT_DATA__` or the bundle, call `generateAuthToken(secret)`, and POST to your contact and mentorship endpoints without restriction. Your rate limiter is the only remaining guard (and that's also broken — see #4).

**Fix:** Remove `NEXT_PUBLIC_INTERNAL_API_SECRET` entirely. The server never needs the client to prove it knows a secret — the client just needs to *call* the API. Use a proper pattern:
- Move form submissions through a Next.js Server Action (removes the need for manual auth tokens on same-origin calls entirely), or
- If you must keep API routes, validate the `Origin` / `Referer` header server-side and set a `SameSite=Strict` cookie session instead.

The secret in `serverEnv` (`INTERNAL_API_SECRET`) is fine. The public one needs to die.

---

### 2. The Rate Limiter Is a Placebo in Production

**File:** `lib/utils/rate-limit.ts`

```ts
const rateLimitStore = new Map<string, RateLimitEntry>();
```

This is an **in-memory store per process.** On serverless platforms (Netlify Functions, Vercel Serverless) — which this project explicitly targets (note the `netlify()` preset in env config) — each invocation may spin up a fresh cold-start container. The `Map` is empty every time. A determined attacker can trivially bypass your 3-requests-per-5-minutes limit by hitting different instances.

**Fix:** Use a persistent external store. Options:
- **Upstash Redis** (free tier, works on edge/serverless, ~3 lines of code with `@upstash/ratelimit`)
- **Vercel KV** if deploying to Vercel
- Alternatively, use a middleware-level rate limiter on your hosting platform (Netlify's built-in rate limiting, Cloudflare WAF)

---

### 3. reCAPTCHA Client and Server Logic Cohabiting in the Same File

**File:** `lib/utils/recaptcha.ts`

```ts
import { clientEnv } from '@/lib/env/client';   // client-side import
import { serverEnv } from '@/lib/env/server';   // server-side import
```

`getRecaptchaToken` uses `clientEnv` — it's a browser function. `verifyRecaptcha` uses `serverEnv` — it's a server function. Both live in the same module. If this file is imported in a Server Component or API route, `clientEnv` will attempt to read `NEXT_PUBLIC_*` variables in a server context, which works coincidentally but is architecturally wrong and can cause subtle issues with module bundling and tree-shaking.

Also: **reCAPTCHA is not actually being used.** Both API routes have `recaptcha_score: 0 // Not using reCAPTCHA anymore`. Yet the contact and mentorship forms still render:

```tsx
<p className="text-sm text-muted-foreground text-center">
  This site is protected by reCAPTCHA and the Google{' '}
  <a href="https://policies.google.com/privacy">Privacy Policy</a>...
```

That is a **false statement** shown to users. You are claiming Google reCAPTCHA protection you don't have.

**Fix:** 
- Split `recaptcha.ts` into `recaptcha.client.ts` and `recaptcha.server.ts`
- Remove the reCAPTCHA legal notice from both forms immediately, or actually implement reCAPTCHA

---

## 🟠 HIGH

### 4. Duplicate Type Definitions Waiting to Diverge

**Files:** `lib/types.ts` vs. `lib/utils/validation.ts`

```ts
// lib/types.ts
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;  // <-- field exists here
}
```

```ts
// lib/utils/validation.ts
export const contactFormSchema = z.object({
  name: z.string()...,
  email: z.string()...,
  subject: z.string()...,
  message: z.string()...,
  // recaptchaToken: not here
});

export type ContactFormData = z.infer<typeof contactFormSchema>; // <-- same name, different type
```

You have **two `ContactFormData` types** with the same name living in separate files with different shapes. Same problem for `MentorshipFormData`. If both are imported in the same file, TypeScript will use whichever was imported last. If they drift further, forms, API routes, and services will silently accept or reject different fields.

**Fix:** Delete the manual interface declarations in `lib/types.ts`. The Zod-inferred types in `validation.ts` are the single source of truth. Export from there.

---

### 5. You Installed react-markdown and Then Wrote Your Own Broken Parser

**File:** `lib/utils/markdown.ts`

```ts
export function markdownToHtml(markdown: string): string {
  // This is a very basic implementation
  // In production, use a proper markdown parser like 'marked' or 'remark'
  return markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$2</h2>')   // BUG: $2 doesn't exist, will be empty string
    .replace(/^### (.+)$/gm, '<h3>$3</h3>')  // BUG: same
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')         // wraps EVERYTHING including <h1> tags in <p>
    .replace(/<p><h/g, '<h')
    .replace(/<\/h[1-6]><\/p>/g, '</h1>');   // hardcodes </h1> regardless of heading level
}
```

This function:
- Uses `$2` and `$3` in regex replacements that only have one capture group, producing empty headings for h2 and h3
- Wraps every single line including your just-generated `<h1>` tags in `<p>` tags, then tries to strip them with another regex
- Replaces all closing heading tags with `</h1>` regardless of the heading level (your h2 becomes `</h1>`)
- Has a self-aware comment saying "don't use this in production" while sitting directly in the production code path

**And you already have `react-markdown` in your dependencies.** `MarkdownRenderer` component exists and uses `react-markdown` properly. This function is never used in any page or component — it's dead, broken code.

**Fix:** Delete `markdownToHtml`. It's not used, it doesn't work, and the right tool is already installed.

---

### 6. generateStaticParams for Careers Ignores `show: false`

**File:** `app/careers/[slug]/page.tsx`

```ts
export async function generateStaticParams() {
  return careerItems
    .map((item) => ({
      slug: item.slug,
    }));
}
```

The function generates static pages for **all** career items, including those with `show: false`. Notably, `podici` has `show: false` and will get a statically generated page. The detail page itself doesn't call `notFound()` for hidden items — it only checks by `slug` match, not visibility. This means hidden careers are publicly accessible via direct URL even though they don't appear in any navigation.

**Fix:**

```ts
export async function generateStaticParams() {
  return getVisibleItems(careerItems).map((item) => ({ slug: item.slug }));
}
```

And in the detail page handler, use `getVisibleItems(careerItems).find(...)` instead of `careerItems.find(...)`.

---

### 7. Client-Side Form Validation Completely Disconnected from Zod Schemas

**Files:** `components/features/ContactForm.tsx`, `components/features/MentorshipForm.tsx`

Both forms implement **manual, hand-rolled validation** alongside perfectly good Zod schemas already defined in `lib/utils/validation.ts`:

```ts
// ContactForm.tsx — manual validation
if (!formData.email.trim()) {
  newErrors.email = 'Email is required';
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  newErrors.email = 'Please enter a valid email';
}
```

```ts
// validation.ts — Zod schema
email: z.string().email('Please provide a valid email address'),
```

These are two independent validation implementations for the same field. The phone regex in `MentorshipForm.tsx` (`/^[\d\s\-\+\(\)]+$/`) is also more permissive than the Zod schema regex (`/^[+]?[(]?[0-9]{1,4}[)]?...`). So valid inputs server-side may be blocked client-side and vice versa.

You have Zod. You have `safeParse`. Use them on both ends.

**Fix:** Replace `validateForm()` in both components with `contactFormSchema.safeParse(formData)` and map the Zod errors to your `FormErrors` state. One schema, one truth.

---

### 8. structured-data.ts Bypasses Your Validated Environment

**File:** `lib/utils/structured-data.ts`

```ts
url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
```

This appears **four times** across `generatePersonSchema`, `generateWebsiteSchema`, `generateProjectSchema`, `generateBreadcrumbSchema`, and `generateProfilePageSchema`. You went through the effort of setting up `@t3-oss/env-nextjs` with Zod validation to ensure environment variables are present and correctly typed — and then you completely bypass it in the one file that actually constructs the canonical URLs for your entire SEO schema.

If `NEXT_PUBLIC_APP_URL` is missing, instead of a build-time error (which t3-env would give you), you silently fall back to `http://localhost:3000` in production.

**Fix:** `import { clientEnv } from '@/lib/env/client'` and use `clientEnv.NEXT_PUBLIC_APP_URL`.

---

### 9. Related Projects Filter Has an Operator Precedence Bug

**File:** `app/projects/[slug]/page.tsx`

```ts
const relatedProjects = visibleProjects.filter(
  (p) =>
    (p.slug !== project.slug && project.segment.some((seg) => p.segment.includes(seg))) ||
    project.stack_role.some((role) => p.stack_role.includes(role))
);
```

The `||` condition is **not grouped** with the `p.slug !== project.slug` check. The expanded logic is:

```
(slug ≠ current AND has matching segment) OR (has matching role)
```

The second condition `project.stack_role.some(...)` will match the *current project itself* if it shares a role with itself — which it always does. The current project appears in its own "Related Projects" section.

**Fix:**

```ts
const relatedProjects = visibleProjects.filter(
  (p) =>
    p.slug !== project.slug &&
    (project.segment.some((seg) => p.segment.includes(seg)) ||
      project.stack_role.some((role) => p.stack_role.includes(role)))
);
```

---

### 10. `MentorshipFormTelegramService` Has a Type Mismatch on `phone`

**File:** `lib/services/telegram/MentorshipFormTelegramService.ts`

```ts
export interface MentorshipFormTelegramServiceData {
  phone: string;  // required
  ...
}
```

But in `lib/types.ts`:
```ts
export interface MentorshipFormData {
  phone?: string;  // optional
  ...
}
```

And in the API route:
```ts
await mentorshipFormTelegramService.sendNotification({
  phone,  // could be undefined
  ...
});
```

If `phone` is `undefined`, the service receives `undefined` where it expects `string`. TypeScript might let this slide depending on how the generic is resolved, but the intent is clearly wrong.

**Fix:** Mark `phone` as optional in `MentorshipFormTelegramServiceData`: `phone?: string`.

---

## 🟡 MEDIUM

### 11. The `priority` Field Is a Museum Exhibit — Never Actually Used

**Files:** `lib/data/career_history.ts`, `lib/data/skills.ts`, `lib/data/projects/personal/*.ts`, etc.

Every single item in the data files has `priority: 0`:

```ts
// career_history.ts
{ company_name: 'Glover Techstars', priority: 0, show: true },
{ company_name: 'Patricia Technologies', priority: 0, show: true },
{ company_name: 'Khora Digitals', priority: 0, show: true },
// ... all 6 items: priority: 0
```

```ts
// skills.ts — soft skills
{ name: 'Technical Strategy', priority: 0, show: true },
{ name: 'Open Source Advocacy', priority: 0, show: true },
{ name: 'Web Engineer', priority: 0, show: true },
```

You have `sortByPriority` in `lib/utils/data.ts` and it's called in `ResumeBuilder` and `Testimonials`. It sorts — but it sorts a list where every element compares equal. The field exists in the type, is populated in every data file, used in sort calls, and accomplishes absolutely nothing.

**Fix:** Either assign meaningful priority values to actually control display order, or be honest and remove the field from types and data.

---

### 12. `useDebounce` is Hardcoded to String — Not a Generic Hook

**File:** `lib/hooks/debounce.ts`

```ts
export function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
```

A debounce hook typed exclusively for strings in a TypeScript codebase is an embarrassment. Every use of this hook happens to pass a string today — but the whole point of writing a custom hook is reusability.

**Fix:**

```ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  // ...
}
```

---

### 13. `Testimonials.tsx` — Expensive Computations Running on Every Render

**File:** `components/sections/Testimonials.tsx`

```ts
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const visibleTestimonials = sortByPriority(getVisibleItems(testimonials));  // computed each render
  const totalSlides = Math.ceil(visibleTestimonials.length / 3);              // computed each render
```

`visibleTestimonials` runs `filter` + `sort` on every render. `totalSlides` is derived from it. The `useEffect` interval depends on `totalSlides`. Every time `currentIndex` or `isAutoPlaying` updates — which happens every 5 seconds during auto-play — these computations run again on data that never changes.

**Fix:**

```ts
const visibleTestimonials = useMemo(() => sortByPriority(getVisibleItems(testimonials)), []);
const totalSlides = useMemo(() => Math.ceil(visibleTestimonials.length / 3), [visibleTestimonials]);
```

Also: `goToPrevious` and `goToNext` recreate on every render because they're plain functions. `useCallback` would help.

---

### 14. `ResumeBuilder` Uses Mutable String Names as Item Identifiers

**File:** `components/features/resume/ResumeBuilder.tsx`

```ts
selectedItems: {
  experience: visibleCareer.slice(0, 3).map((item) => item.company_name),
  education: visibleEducation.slice(0, 2).map((item) => item.school),
  skills: visibleSkills.slice(0, 6).map((item) => item.name),
  projects: visibleProjects.slice(0, 3).map((item) => item.name),
},
```

Career items and projects already have `slug` fields — unique, URL-safe identifiers — specifically for this purpose. Instead, the resume builder uses `company_name` and `item.name` as keys. If two projects or skills happen to share a name, this logic breaks silently.

Similarly, the localStorage persistence stores these string names. A data update that renames an item would corrupt the saved config.

**Fix:** Use `item.slug` for career and project items. Use a stable identifier for skills (or add slugs to `Skill`).

---

### 15. `Button` Loading State Ignores Your `children` Text

**File:** `components/ui/Button.tsx`

```ts
{loading ? (
  <>
    <SpinnerIcon className="h-4 w-4 animate-spin" />
    <span>Loading...</span>
  </>
) : (
  // ... children
)}
```

The loading text is hardcoded as "Loading..." unconditionally. The forms use it as:

```tsx
<Button loading={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</Button>
```

The consumer passes "Sending..." but the Button renders "Loading..." because it never uses `children` in the loading state. The component API is misleading — you pass a loading label that gets thrown away.

**Fix:** Either render `children` alongside the spinner (most common pattern), or accept a `loadingText` prop, or document clearly that `children` is ignored during loading so callers stop bothering.

---

### 16. `Select.tsx` Uses Hardcoded Colors Instead of Design Tokens

**File:** `components/ui/Select.tsx`

```ts
className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
// ...
className="border-gray-300 focus:border-black focus:ring-black dark:border-gray-700 dark:focus:border-white"
// ...
className="bg-white dark:bg-gray-900"
```

Every other form component (`Input.tsx`, `Button.tsx`, `Card.tsx`) uses semantic design tokens: `text-foreground`, `border-input`, `bg-background`, `text-destructive`. `Select.tsx` is the odd one out, using raw Tailwind gray scale values. This will break when the theme's color palette changes, and it's inconsistent with the rest of your design system.

**Fix:** Align `Select.tsx` with `Input.tsx`'s token-based approach.

---

### 17. The `knowsAbout` Array in Structured Data Is Manually Maintained

**File:** `lib/utils/structured-data.ts`

```ts
knowsAbout: [
  'Software Engineering',
  'Web Development',
  'Laravel',
  'Next.js',
  'React',
  'TypeScript',
  'PHP',
  'JavaScript',
  'Full-Stack Development',
],
```

You have a comprehensive, well-structured skills dataset in `lib/data/skills.ts` with all your technical expertise. You're not using it here. This list is a manual summary that will fall out of date the moment you update your actual skills. You've already defeated the point of maintaining data files.

**Fix:**

```ts
import { technicalSkills } from '@/lib/data/skills';
// ...
knowsAbout: technicalSkills.flatMap((skill) => skill.icons.map((icon) => icon.label)),
```

---

### 18. `Modal.tsx` Sets `overflow: 'unset'` — Wrong and Fragile

**File:** `components/ui/Modal.tsx`

```ts
document.body.style.overflow = 'hidden';
// cleanup:
document.body.style.overflow = 'unset';
```

`'unset'` is a CSS keyword meaning "remove the property and inherit." The correct JavaScript value to restore default overflow is `''` (empty string) which removes the inline style entirely, or `'auto'`. Using `'unset'` works in some browsers but is semantically incorrect via the CSSOM.

Additionally, if two modals were open simultaneously (unlikely here, but your `Modal` component is generic), closing the first one would restore body scrolling while the second is still open.

**Fix:** Use `document.body.style.overflow = ''` to remove the inline override cleanly.

---

### 19. `skills-svg/route.tsx` Has O(n²) Height Calculation

**File:** `app/embeds/skills-svg/route.tsx`

```ts
const categoriesContent = await Promise.all(
  technicalSkills.map(async (category, catIndex) => {
    let catY = padding;
    for (let i = 0; i < catIndex; i++) {        // inner loop over all previous categories
      const prevCat = technicalSkills[i];
      const iconsPerRow = Math.floor((width - 2 * padding) / (iconSize + iconGap));
      const rows = Math.ceil(prevCat.icons.length / iconsPerRow);
      catY += titleHeight + 10 + rows * (iconSize + iconGap) + categoryGap;
    }
```

For each category at index `n`, you re-iterate over all `0..n-1` categories to recalculate the Y offset from scratch. The same `iconsPerRow` calculation (`Math.floor(...)`) is computed inside both the outer measurement pass AND the inner loop — it's a constant.

This runs in production on every request (`dynamic = 'force-dynamic'`). With 8 tech skill categories it's trivial, but it's still needlessly quadratic and wasteful.

**Fix:** Build a `categoryOffsets[]` array in a single linear pass before the render loop.

---

### 20. `PWAProvider.tsx` Has `console.log` in Production

**File:** `components/providers/PWAProvider.tsx`

```ts
console.log('Service Worker registered with scope:', registration.scope);
// ...
console.log('New version available! Reload to update.');
```

These fire in every user's browser console in production. The first one is pure noise. The second one notifies developers but not users — and if you actually want to notify users of an update, `console.log` is the wrong channel.

**Fix:** Remove the first log. Replace the second with a proper UI notification (toast, banner) if you want users to act on it.

---

### 21. `sortByPriority` in `ResumeBuilder` Called with Non-Existent Second Argument

**File:** `components/features/resume/ResumeBuilder.tsx`

```ts
const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');
```

`sortByPriority` signature:

```ts
export function sortByPriority<T extends HasVisibility>(
  items: T[],
  direction: 'asc' | 'desc' = 'asc'
): T[]
```

This is actually correct TypeScript. But since every item has `priority: 0` (see issue #11), descending vs. ascending produces identical results. You're calling this with direction arguments to convey intent to future readers, but the intent is undermined by the data.

---

## 🔵 LOW

### 22. False ESLint Disable Comments for a Rule That Doesn't Exist

**Files:** `components/ui/ThemeToggle.tsx`, `components/features/resume/ResumeBuilder.tsx`

```ts
// eslint-disable-next-line react-hooks/set-state-in-effect
setMounted(true);

// eslint-disable-line react-hooks/set-state-in-effect
setIsMounted(true);
```

`react-hooks/set-state-in-effect` is **not a real ESLint rule**. The `react-hooks` plugin doesn't have a `set-state-in-effect` rule. These comments silence nothing and confuse everyone who reads them. The `setMounted(true)` pattern in a `useEffect` with an empty dependency array is completely standard and generates no actual lint warning.

**Fix:** Delete both comments.

---

### 23. Stale Comment Left in Footer

**File:** `components/layout/Footer.tsx`

```tsx
{/* Icon placeholder - will be replaced with actual icons */}
<Icon.fromIcon icon={social.icon} size={20} className="flex-shrink-0" />
```

The icon is already there. It has been there. The comment predates the implementation and was never cleaned up.

**Fix:** Delete the comment.

---

### 24. Copyright Year Is Hardcoded as a String in Profile Data

**File:** `lib/data/profile.ts`

```ts
copyright: {
  year: '2025',  // hardcoded string
  ...
}
```

The Footer correctly computes `new Date().getFullYear()` and ignores this field entirely. The `Profile` type has a `copyright.year` field, the data file has `'2025'`, and it's never read. In 2026 it's already stale.

**Fix:** Remove `year` from the `Profile.copyright` type and data. The footer has it right.

---

### 25. Dev Artifacts Committed to the Repository Root

**Files:** `IMPLEMENTATION_PLAN.md`, `profile-update.md`

These are planning and development notes that have no business being in a production repository that people visit on GitHub. `IMPLEMENTATION_PLAN.md` exposes your development roadmap and internal notes. `profile-update.md` is a raw data update file.

**Fix:** Add to `.gitignore` or move to a private notes location. If you want a changelog, use `CHANGELOG.md` in a proper format.

---

### 26. Data Inconsistency in Career History

**File:** `lib/data/career_history.ts`

```ts
{
  slug: 'khora-digitals',
  description: 'Specialised 3-month contract focused on rapid web solution delivery...',
  duties: [
    'Developed a total of two 2 web solutions to client companies in my one month contract period',
    //                                              ^ contradicts "3-month" above
    "Worked remotely with 2 existing staffs..."
    //                              ^ "staffs" is not standard English; the word is "staff"
  ],
}
```

The description says "3-month contract" but the duty says "one month contract period." Also, "2 existing staffs" should be "2 existing staff members" (staff is uncountable).

**Fix:** Reconcile the timeline and proofread. This is on a public portfolio.

---

### 27. `lib/db/mongodb.ts` Has a Redundant Non-Null Assertion

**File:** `lib/db/mongodb.ts`

```ts
const MONGODB_URI = serverEnv.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// ... later:
cached.promise = mongoose.connect(MONGODB_URI!, opts)  // non-null assertion here
```

You've already thrown an error if `MONGODB_URI` is falsy two lines earlier. TypeScript doesn't narrow the type through the `throw`, so the `!` is needed to satisfy the compiler — but the real fix is to let `serverEnv.MONGODB_URI` (which is already validated as `z.url()`) carry the non-optional type. The manual guard and the assertion are redundant.

**Fix:** Remove the manual `if (!MONGODB_URI)` check. `@t3-oss/env-nextjs` already throws a build-time error if the variable is missing. Trust your tools.

---

### 28. Metadata Keywords Duplicated Verbatim Between Layout and Home Page

**Files:** `app/layout.tsx`, `app/page.tsx`

Both files contain near-identical `keywords` arrays:

```ts
// layout.tsx
keywords: ['Software Engineer', 'Full-Stack Developer', 'Laravel', 'Next.js', 'React',
  'TypeScript', 'Web Development', 'Mobile Development', 'Meyoron Aghogho', 'Aghogho Meyoron',
  'Young Mayor', 'MayR Labs', 'YoungMayor', 'YoungMayorDev'],

// page.tsx  
keywords: ['Software Engineer', 'Full-Stack Developer', 'Laravel', 'Next.js', 'React',
  'TypeScript', 'Web Development', 'Mobile Development', 'Meyoron Aghogho', 'Aghogho Meyoron',
  'Young Mayor', 'MayR Labs', 'YoungMayor', 'PHP Developer', 'JavaScript Developer'],
```

These are maintained separately, have slight differences, and will drift further over time.

**Fix:** Extract to `lib/data/meta-keywords.ts` and import in both places.

---

### 29. `app/page.tsx` Has a Semantically Pointless Wrapper `<div>`

**File:** `app/page.tsx`

```tsx
return (
  <>
    {/* Structured Data Scripts */}
    <Script ... />
    <Script ... />
    <Script ... />

    <div>          {/* <-- This div does nothing */}
      <Hero />
      <About />
      <Projects />
      <Career />
      <Testimonials />
    </div>
  </>
);
```

The `<div>` has no class, no id, no semantic role. It exists to give the Scripts something to live alongside, which a Fragment handles perfectly well.

**Fix:** Replace `<div>` with `<>` or just remove the extra wrapper.

---

### 30. `Icon.tsx` Ignores Its Own `className` Prop

**File:** `components/ui/Icon.tsx`

```ts
interface IconProps {
  type: 'dev' | 'simple';
  value: string;
  size?: number;
  className?: string;     // accepted
}

export default function Icon({ type, value, size = 40, className = '' }: IconProps) {
  return <CustomIcon icon={`${type}:${value}`} unoptimized size={size} />;
  //                                                  className not passed ^^^
}
```

The `className` prop is accepted, destructured, defaulted — and then silently discarded. Every caller passing `className` is operating under a false assumption. `Icon.fromIcon` also accepts `className` and propagates the same lie.

**Fix:** Pass `className` to `<CustomIcon>` if the underlying component supports it, or remove `className` from the interface to avoid misleading callers.

---

### 31. `Card.tsx` Has a Duplicated Comment

**File:** `components/ui/Card.tsx`

```ts
// Variant styles - Using soft gradients and ambient shadows
// Variant styles - Using soft gradients and ambient shadows
const variantStyles = {
```

The same comment appears twice consecutively.

**Fix:** Delete one.

---

### 32. Test Coverage Is a Thin Veneer

**Directory:** `__tests__/`

The test suite covers:
- 2 API route handlers
- 3 utility functions

That's it. Zero tests for:
- Any React component
- Custom hooks (`useDebounce`)
- `data.ts` sorting/filtering (partial — `data.test.ts` exists but is sparse)
- Markdown utilities
- Serializers
- Structured data generation
- Rate limiting logic
- Auth token generation/verification
- Database models

The API tests are well-structured. But 5 test files for a codebase of 80+ source files is not a test suite — it's a proof of concept that tests can exist here.

---

### 33. `analyze-bundle.js` Is an Empty Placeholder Script

**File:** `analyze-bundle.js`

```js
// presumably empty or trivial
```

You have `"analyze": "ANALYZE=true next build"` in `package.json` which is the real bundle analysis command. The `analyze-bundle.js` file in the root is either a leftover scaffold or a forgotten helper.

**Fix:** Verify if this file has content and purpose, or delete it.

---

## Summary Table

| # | File(s) | Issue | Severity |
|---|---------|-------|----------|
| 1 | `lib/env/client.ts`, `.env.example` | Server secret exposed to client browser | 🔴 CRITICAL |
| 2 | `lib/utils/rate-limit.ts` | In-memory rate limiter ineffective on serverless | 🔴 CRITICAL |
| 3 | `lib/utils/recaptcha.ts`, forms | Client/server code mixed; false reCAPTCHA notice | 🔴 CRITICAL |
| 4 | `lib/types.ts`, `lib/utils/validation.ts` | Duplicate type definitions that can diverge | 🟠 HIGH |
| 5 | `lib/utils/markdown.ts` | Broken hand-rolled Markdown parser with react-markdown installed | 🟠 HIGH |
| 6 | `app/careers/[slug]/page.tsx` | generateStaticParams exposes hidden career items | 🟠 HIGH |
| 7 | `ContactForm.tsx`, `MentorshipForm.tsx` | Client validation disconnected from Zod schemas | 🟠 HIGH |
| 8 | `lib/utils/structured-data.ts` | Bypasses validated env, silent localhost fallback | 🟠 HIGH |
| 9 | `app/projects/[slug]/page.tsx` | Operator precedence bug in related projects filter | 🟠 HIGH |
| 10 | `MentorshipFormTelegramService.ts` | `phone` typed required vs. optional mismatch | 🟠 HIGH |
| 11 | All data files | `priority: 0` everywhere — field is decorative | 🟡 MEDIUM |
| 12 | `lib/hooks/debounce.ts` | Non-generic debounce hook hardcoded to string | 🟡 MEDIUM |
| 13 | `components/sections/Testimonials.tsx` | Expensive computations on every re-render | 🟡 MEDIUM |
| 14 | `ResumeBuilder.tsx` | Mutable string names used as item IDs | 🟡 MEDIUM |
| 15 | `components/ui/Button.tsx` | Loading state ignores children text | 🟡 MEDIUM |
| 16 | `components/ui/Select.tsx` | Hardcoded colors bypass design token system | 🟡 MEDIUM |
| 17 | `lib/utils/structured-data.ts` | `knowsAbout` manually maintained, disconnected from skills data | 🟡 MEDIUM |
| 18 | `components/ui/Modal.tsx` | `overflow: 'unset'` — wrong CSS value | 🟡 MEDIUM |
| 19 | `app/embeds/skills-svg/route.tsx` | O(n²) height calculation | 🟡 MEDIUM |
| 20 | `components/providers/PWAProvider.tsx` | `console.log` in production | 🟡 MEDIUM |
| 21 | `ResumeBuilder.tsx` | `sortByPriority('desc')` called on all-zero priorities | 🟡 MEDIUM |
| 22 | `ThemeToggle.tsx`, `ResumeBuilder.tsx` | Fake ESLint disable comments | 🔵 LOW |
| 23 | `components/layout/Footer.tsx` | Stale comment: "placeholder - will be replaced" | 🔵 LOW |
| 24 | `lib/data/profile.ts` | `copyright.year` hardcoded as '2025', never read | 🔵 LOW |
| 25 | `IMPLEMENTATION_PLAN.md`, `profile-update.md` | Dev artifacts in repository root | 🔵 LOW |
| 26 | `lib/data/career_history.ts` | Data inconsistency: "3-month" vs "one month"; "staffs" | 🔵 LOW |
| 27 | `lib/db/mongodb.ts` | Redundant null guard + non-null assertion | 🔵 LOW |
| 28 | `app/layout.tsx`, `app/page.tsx` | Keywords array duplicated verbatim | 🔵 LOW |
| 29 | `app/page.tsx` | Pointless `<div>` wrapper around sections | 🔵 LOW |
| 30 | `components/ui/Icon.tsx` | `className` prop silently discarded | 🔵 LOW |
| 31 | `components/ui/Card.tsx` | Duplicate consecutive comment | 🔵 LOW |
| 32 | `__tests__/` | Test coverage covers ~6% of source files | 🔵 LOW |
| 33 | `analyze-bundle.js` | Possibly empty/orphaned script in repo root | 🔵 LOW |

---

## What's Actually Good

To avoid this being a purely one-sided takedown:

- **Architecture is sound.** Clean separation of concerns — `lib/data`, `lib/utils`, `lib/services`, `lib/db`, `components/{ui,features,sections,layout}`. This is the right shape.
- **TypeScript strictness is on and respected.** No reckless `any` casts, interfaces are defined for everything that matters.
- **The `apiAction` abstraction is elegant.** Centralizing auth + rate limiting + error handling in one wrapper function is the right call.
- **SEO implementation is thorough.** Structured data schemas, sitemap, robots.txt, OpenGraph, Twitter Cards — all present and correctly implemented.
- **Dynamic imports for below-fold sections** are correctly applied in `app/page.tsx`.
- **`@t3-oss/env-nextjs`** is the right tool for environment variable validation, even if it's sometimes bypassed.
- **The Zod validation schemas** for forms are well-designed. They just need to be used on both sides.

---

## Priority Fix Order

1. 🔴 Remove `NEXT_PUBLIC_INTERNAL_API_SECRET` — do this before the next deploy
2. 🔴 Remove the reCAPTCHA legal notice from both forms — it's a user-facing lie
3. 🔴 Replace in-memory rate limiter with a persistent solution
4. 🟠 Delete `markdownToHtml` — it's dead, broken, and mocking you
5. 🟠 Consolidate `ContactFormData` / `MentorshipFormData` to single Zod-inferred types
6. 🟠 Fix related projects operator precedence bug
7. 🟠 Fix `generateStaticParams` to respect `show: false`
8. 🟠 Use validated `clientEnv` in `structured-data.ts`
9. 🟡 Reuse Zod schemas for client-side form validation
10. 🟡 Give `priority` fields meaningful values or remove the field entirely
