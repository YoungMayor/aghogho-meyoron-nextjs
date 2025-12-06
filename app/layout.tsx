import type { Metadata } from 'next';
import './globals.css';

import Footer from '@/components/layout/Footer';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://mayrlabs.com'),
  title: {
    default: 'Aghogho Meyoron | Software Engineer',
    template: '%s | Aghogho Meyoron',
  },
  description:
    'Portfolio of Aghogho Meyoron, a seasoned full-stack software engineer specializing in Laravel, Next.js, React, and modern web development.',
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'Laravel',
    'Next.js',
    'React',
    'TypeScript',
    'Web Development',
    'Mobile Development',
    'Meyoron Aghogho',
    'Aghogho Meyoron',
    'Young Mayor',
    'MayR Labs',
    'YoungMayor',
    'YoungMayorDev',
  ],
  authors: [{ name: 'Aghogho Meyoron', url: 'https://mayrlabs.com' }],
  creator: 'Aghogho Meyoron',
  publisher: 'MayR Labs',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'Aghogho Meyoron',
    title: 'Aghogho Meyoron | Software Engineer',
    description:
      'Portfolio of Aghogho Meyoron, a seasoned full-stack software engineer specializing in Laravel, Next.js, React, and modern web development.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aghogho Meyoron | Software Engineer',
    description: 'Portfolio of Aghogho Meyoron, a seasoned full-stack software engineer.',
    creator: '@youngmayor_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
