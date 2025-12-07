import Link from 'next/link';
import { profile } from '@/lib/data/profile';
import { socialLinks as allSocialLinks } from '@/lib/data/social_links';
import { getVisibleAndSorted } from '@/lib/utils/data';
import Icon from '@/components/ui/Icon';

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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.notes.tagline}</p>
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
                  <Icon.fromIcon icon={social.icon} size={20} className="flex-shrink-0" />
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
              Built with ❤️ by {profile.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
