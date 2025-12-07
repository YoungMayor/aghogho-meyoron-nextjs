import { profile } from '@/lib/data/profile';
import { socialLinks } from '@/lib/data/social_links';
import { getVisibleItems } from '@/lib/utils/data';
import { faqs } from '@/lib/data/faq';
import SubPageHeader from '@/components/layout/SubPageHeader';
import ContactForm from '@/components/features/ContactForm';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import MailIcon from '@/components/icons/MailIcon';
import PhoneIcon from '@/components/icons/PhoneIcon';

export default function ContactPage() {
  const visibleSocialLinks = getVisibleItems(socialLinks);

  return (
    <div className="min-h-screen flex flex-col">
      <SubPageHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                        <MailIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href={`mailto:${profile.contact.email}`}
                          className="text-muted-foreground hover:text-foreground break-all"
                        >
                          {profile.contact.email}
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Phone */}
                  <Card padding="md">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                        <PhoneIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a
                          href={`tel:${profile.contact.phone}`}
                          className="text-muted-foreground hover:text-foreground"
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
                          className="group flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl transition-all duration-300"
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
                      <div className="text-sm text-muted-foreground">{profile.contact.message}</div>
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
        <section className="py-12 px-4 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} padding="md">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
