'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Spinner from '@/components/ui/Spinner';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';

type Step = 'input' | 'summary' | 'outputs';

export default function AIApplyPage() {
  const [step, setStep] = useState<Step>('input');

  // Application State
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Result State
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [jobSummary, setJobSummary] = useState('');
  const [outputs, setOutputs] = useState<{
    coverLetter?: string;
    recruiterDm?: string;
    shortPitch?: string;
    customQa?: { question: string; answer: string }[];
  }>({ customQa: [] });

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<
    'cover_letter' | 'recruiter_dm' | 'short_pitch' | 'custom'
  >('cover_letter');
  const [customQuestion, setCustomQuestion] = useState('');

  const handleGenerateSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !jobDescription) {
      setError('Company name and Job Description are required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, role, link, jobDescription }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await res.json();
      setJobSummary(data.jobSummary);
      setApplicationId(data.applicationId);
      setStep('summary');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateOutput = async (
    type: 'cover_letter' | 'recruiter_dm' | 'short_pitch' | 'custom'
  ) => {
    if (!applicationId || !jobSummary) return;

    if (type === 'custom' && !customQuestion) {
      setError('Please enter a custom question.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/generate-output', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          type,
          customPrompt: type === 'custom' ? customQuestion : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate ${type.replace('_', ' ')}`);
      }

      const data = await res.json();

      setOutputs((prev) => {
        if (type === 'custom') {
          return {
            ...prev,
            customQa: [...(prev.customQa || []), { question: customQuestion, answer: data.output }],
          };
        }
        return {
          ...prev,
          [type === 'cover_letter'
            ? 'coverLetter'
            : type === 'recruiter_dm'
              ? 'recruiterDm'
              : 'shortPitch']: data.output,
        };
      });

      if (type === 'custom') {
        setCustomQuestion('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-bold mb-2">AI Job Application Assistant</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Paste your job details and let AI create tailored outreach materials based on your profile.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200">
          {error}
        </div>
      )}

      {step === 'input' && (
        <Card className="p-6">
          <form onSubmit={handleGenerateSummary} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name *</label>
                <Input
                  value={companyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCompanyName(e.target.value)
                  }
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role (Optional)</label>
                <Input
                  value={role}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Link (Optional)</label>
              <Input
                value={link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
                placeholder="https://acme.com/jobs/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Description *</label>
              <Textarea
                value={jobDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste the full job description here..."
                rows={10}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Generating Summary...
                </>
              ) : (
                'Analyze & Generate Summary'
              )}
            </Button>
          </form>
        </Card>
      )}

      {step === 'summary' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Job Summary</h2>
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={jobSummary} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setStep('input')}>
                Edit Details
              </Button>
              <Button onClick={() => setStep('outputs')}>Proceed to Outputs</Button>
            </div>
          </Card>
        </div>
      )}

      {step === 'outputs' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Generate Tailored Outputs</h2>
            <Button variant="ghost" onClick={() => setStep('summary')} size="sm">
              &larr; Back to Summary
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'cover_letter', label: 'Cover Letter' },
              { id: 'recruiter_dm', label: 'Recruiter DM' },
              { id: 'short_pitch', label: 'Short Pitch' },
              { id: 'custom', label: 'Custom Q&A' },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeOutputTab === tab.id ? 'primary' : 'outline'}
                onClick={() =>
                  setActiveOutputTab(
                    tab.id as 'cover_letter' | 'recruiter_dm' | 'short_pitch' | 'custom'
                  )
                }
                className="rounded-full"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <Card className="p-6 min-h-[400px]">
            {activeOutputTab === 'cover_letter' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Cover Letter</h3>
                  <Button onClick={() => handleGenerateOutput('cover_letter')} disabled={isLoading}>
                    {isLoading ? (
                      <Spinner size="sm" />
                    ) : outputs.coverLetter ? (
                      'Regenerate'
                    ) : (
                      'Generate Cover Letter'
                    )}
                  </Button>
                </div>
                {outputs.coverLetter ? (
                  <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-100 dark:border-gray-800">
                    <MarkdownRenderer content={outputs.coverLetter} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    Click generate to craft a personalized cover letter.
                  </div>
                )}
              </div>
            )}

            {activeOutputTab === 'recruiter_dm' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Recruiter DM</h3>
                  <Button onClick={() => handleGenerateOutput('recruiter_dm')} disabled={isLoading}>
                    {isLoading ? (
                      <Spinner size="sm" />
                    ) : outputs.recruiterDm ? (
                      'Regenerate'
                    ) : (
                      'Generate DM'
                    )}
                  </Button>
                </div>
                {outputs.recruiterDm ? (
                  <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-100 dark:border-gray-800">
                    <MarkdownRenderer content={outputs.recruiterDm} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    Generate a brief, engaging message for LinkedIn or email.
                  </div>
                )}
              </div>
            )}

            {activeOutputTab === 'short_pitch' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Short Pitch</h3>
                  <Button onClick={() => handleGenerateOutput('short_pitch')} disabled={isLoading}>
                    {isLoading ? (
                      <Spinner size="sm" />
                    ) : outputs.shortPitch ? (
                      'Regenerate'
                    ) : (
                      'Generate Pitch'
                    )}
                  </Button>
                </div>
                {outputs.shortPitch ? (
                  <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-100 dark:border-gray-800">
                    <MarkdownRenderer content={outputs.shortPitch} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    Generate a quick elevator pitch tailored to this role.
                  </div>
                )}
              </div>
            )}

            {activeOutputTab === 'custom' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Custom Questions</h3>
                <div className="space-y-4">
                  {(outputs.customQa || []).map((qa, index) => (
                    <div key={index} className="space-y-2 border-b pb-4">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        Q: {qa.question}
                      </p>
                      <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-4 rounded text-sm">
                        <MarkdownRenderer content={qa.answer} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 items-end pt-4">
                  <div className="grow space-y-2">
                    <label className="text-sm font-medium">Ask anything about this job</label>
                    <Input
                      value={customQuestion}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCustomQuestion(e.target.value)
                      }
                      placeholder="e.g. What are the key highlighted skills required?"
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        e.key === 'Enter' && handleGenerateOutput('custom')
                      }
                    />
                  </div>
                  <Button
                    onClick={() => handleGenerateOutput('custom')}
                    disabled={isLoading || !customQuestion.trim()}
                  >
                    {isLoading ? <Spinner size="sm" /> : 'Ask AI'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
