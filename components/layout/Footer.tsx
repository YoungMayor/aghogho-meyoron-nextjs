import Link from 'next/link';
import { profile } from '@/lib/data/profile';
import { socialLinks as allSocialLinks } from '@/lib/data/social_links';
import { getVisibleAndSorted } from '@/lib/utils/data';

export default function Footer() {
  const socialLinks = getVisibleAndSorted(allSocialLinks);

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/mentorship', label: 'Mentorship' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{profile.notes.tagline}</p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {profile.contact.email}
                </a>
              </li>
              {profile.contact.phone && (
                <li>
                  <a
                    href={`tel:${profile.contact.phone}`}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {profile.contact.phone}
                  </a>
                </li>
              )}
            </ul>

            {/* Social Links */}
            <div className="mt-4 flex gap-4">
              {socialLinks.slice(0, 5).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  {/* Icon placeholder - will be replaced with actual icons */}
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} {profile.copyright.creator_name}. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with{' '}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                Next.js
              </a>{' '}
              &{' '}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                Tailwind CSS
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
