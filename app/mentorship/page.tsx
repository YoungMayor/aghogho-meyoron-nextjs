import { testimonials } from '@/lib/data/testimonials';
import { mentorshipBenefits, mentorshipProcess } from '@/lib/data/mentorship';
import { getVisibleItems } from '@/lib/utils/data';
import Header from '@/components/layout/Header';
import MentorshipForm from '@/components/features/MentorshipForm';
import TestimonialCard from '@/components/features/TestimonialCard';
import Card from '@/components/ui/Card';
import Image from 'next/image';

export default function MentorshipPage() {
  // Get mentee testimonials
  const menteeTestimonials = getVisibleItems(testimonials).filter((t) => t.type === 'mentee');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mentorship Program</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Growing together through knowledge sharing, guidance, and support
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card padding="lg">
              <h2 className="text-2xl font-bold mb-4">About My Mentorship</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  I&apos;m passionate about helping aspiring developers and tech professionals grow
                  in their careers. Through personalized mentorship, I provide guidance on technical
                  skills, career development, and navigating the tech industry.
                </p>
                <p>
                  Whether you&apos;re just starting out or looking to level up your skills, I&apos;m
                  here to support your journey with practical advice, code reviews, and career
                  guidance.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What You&apos;ll Get</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentorshipBenefits.map((benefit, index) => (
                <Card key={index} padding="lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={24}
                      height={24}
                      className="w-6 h-6 text-white dark:text-black invert dark:invert-0"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {menteeTestimonials.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">What Mentees Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menteeTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.person.name} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Application Form */}
        <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Apply for Mentorship</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below to apply for my mentorship program. I&apos;ll review your
                application and get back to you soon.
              </p>
            </div>

            <Card padding="lg">
              <MentorshipForm />
            </Card>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What to Expect</h2>

            <div className="space-y-4">
              {mentorshipProcess.map((step, index) => (
                <Card key={index} padding="md">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
