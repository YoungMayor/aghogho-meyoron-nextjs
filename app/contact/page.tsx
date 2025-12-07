import { profile } from '@/lib/data/profile';
import { socialLinks } from '@/lib/data/social_links';
import { getVisibleItems } from '@/lib/utils/data';
import { faqs } from '@/lib/data/faq';
import SubPageHeader from '@/components/layout/SubPageHeader';
import ContactForm from '@/components/features/ContactForm';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';

export default function ContactPage() {
  const visibleSocialLinks = getVisibleItems(socialLinks);

  return (
    <div className="min-h-screen flex flex-col">
      <SubPageHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I&apos;d love to hear from
              you!
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  {/* Email */}
                  <Card padding="md">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href={`mailto:${profile.contact.email}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white break-all"
                        >
                          {profile.contact.email}
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Phone */}
                  <Card padding="md">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a
                          href={`tel:${profile.contact.phone}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                        >
                          {profile.contact.phone}
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Social Links */}
                  <Card padding="md">
                    <h3 className="font-semibold mb-4">Connect on Social Media</h3>
                    <div className="flex flex-wrap gap-3">
                      {visibleSocialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
                          title={link.label}
                        >
                          <Icon.fromIcon icon={link.icon} size={20} />
                          <span className="text-sm font-medium">{link.platform}</span>
                        </a>
                      ))}
                    </div>
                  </Card>

                  {/* Message */}
                  {profile.contact.message && (
                    <Card padding="md">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.contact.message}
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                <Card padding="lg">
                  <ContactForm />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} padding="md">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
