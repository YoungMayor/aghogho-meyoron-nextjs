import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Meyoron Aghogho | Software Engineer',
    template: '%s | Meyoron Aghogho',
  },
  description:
    'Portfolio of Meyoron Aghogho, a seasoned full-stack software engineer specializing in Laravel, Next.js, React, and modern web development.',
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
  ],
  authors: [{ name: 'Meyoron Aghogho' }],
  creator: 'Meyoron Aghogho',
  publisher: 'MayR Labs',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'Meyoron Aghogho Portfolio',
    title: 'Meyoron Aghogho | Software Engineer',
    description:
      'Portfolio of Meyoron Aghogho, a seasoned full-stack software engineer specializing in Laravel, Next.js, React, and modern web development.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meyoron Aghogho | Software Engineer',
    description:
      'Portfolio of Meyoron Aghogho, a seasoned full-stack software engineer.',
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
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
