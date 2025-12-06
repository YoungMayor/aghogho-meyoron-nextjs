import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-preference');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
