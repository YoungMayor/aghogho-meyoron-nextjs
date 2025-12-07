import { testimonials } from '@/lib/data/testimonials';
import { getVisibleItems } from '@/lib/utils/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MentorshipForm from '@/components/features/MentorshipForm';
import TestimonialCard from '@/components/features/TestimonialCard';
import Card from '@/components/ui/Card';

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

        {/* What You&apos;ll Get */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What You&apos;ll Get</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card padding="lg">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Code Reviews</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get detailed feedback on your code, learn best practices, and improve your coding
                  skills.
                </p>
              </Card>

              <Card padding="lg">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Technical Guidance</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Navigate complex technical challenges with expert advice and practical solutions.
                </p>
              </Card>

              <Card padding="lg">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Career Development</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get advice on career paths, job searching, interviews, and professional growth.
                </p>
              </Card>

              <Card padding="lg">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Access curated learning materials, tutorials, and resources tailored to your
                  goals.
                </p>
              </Card>

              <Card padding="lg">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Networking</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect with other professionals and expand your network in the tech community.
                </p>
              </Card>

              <Card padding="lg">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Regular Check-ins</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Stay accountable with regular sessions to discuss progress, challenges, and next
                  steps.
                </p>
              </Card>
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
              <Card padding="md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Application Review</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      After submitting your application, I&apos;ll review it within 3-5 business
                      days.
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Initial Call</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      If your application is a good fit, we&apos;ll schedule an initial call to
                      discuss your goals and expectations.
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Create a Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Together, we&apos;ll create a personalized learning plan based on your current
                      skills and goals.
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Regular Sessions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We&apos;ll meet regularly (frequency based on your commitment level) to work
                      through challenges and track progress.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
