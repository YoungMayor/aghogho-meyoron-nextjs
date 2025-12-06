import matter from 'gray-matter';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

export interface MarkdownContent<T = Record<string, unknown>> {
  content: string;
  data: T;
  excerpt?: string;
}

/**
 * Parse markdown file with frontmatter
 * @param filepath Full path to markdown file
 */
export function parseMarkdownFile<T = Record<string, unknown>>(
  filepath: string
): MarkdownContent<T> {
  if (!existsSync(filepath)) {
    throw new Error(`Markdown file not found: ${filepath}`);
  }

  const fileContent = readFileSync(filepath, 'utf8');
  const { data, content, excerpt } = matter(fileContent, {
    excerpt: true,
  });

  return {
    content,
    data: data as T,
    excerpt,
  };
}

/**
 * Get all markdown files from a directory
 * @param dir Directory path relative to project root
 */
export function getMarkdownFiles(dir: string): string[] {
  const fullPath = join(process.cwd(), dir);

  if (!existsSync(fullPath)) {
    return [];
  }

  return readdirSync(fullPath).filter((file) => file.endsWith('.md'));
}

/**
 * Get markdown content by slug
 * @param dir Directory path relative to project root
 * @param slug File slug (without .md extension)
 */
export function getMarkdownBySlug<T = Record<string, unknown>>(
  dir: string,
  slug: string
): MarkdownContent<T> | null {
  const filepath = join(process.cwd(), dir, `${slug}.md`);

  if (!existsSync(filepath)) {
    return null;
  }

  return parseMarkdownFile<T>(filepath);
}

/**
 * Get all markdown contents from a directory
 * @param dir Directory path relative to project root
 */
export function getAllMarkdownContents<T = Record<string, unknown>>(
  dir: string
): Array<MarkdownContent<T> & { slug: string }> {
  const files = getMarkdownFiles(dir);

  return files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const content = getMarkdownBySlug<T>(dir, slug);

    if (!content) {
      throw new Error(`Failed to parse markdown file: ${file}`);
    }

    return {
      ...content,
      slug,
    };
  });
}

/**
 * Render markdown to HTML (basic implementation)
 * For production, consider using a library like 'marked' or 'remark'
 */
export function markdownToHtml(markdown: string): string {
  // This is a very basic implementation
  // In production, use a proper markdown parser like 'marked' or 'remark'
  return markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h[1-6]><\/p>/g, '</h1>');
}
