import mongoose, { Schema, Model } from 'mongoose';

export interface IJobApplication {
  company_name: string;
  role?: string;
  link?: string;
  job_description: string;
  job_summary?: string;
  generated_outputs: {
    cover_letter?: string;
    recruiter_dm?: string;
    short_pitch?: string;
    custom_qa?: { question: string; answer: string }[];
  };
  created_at: Date;
  updated_at: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    company_name: { type: String, required: true },
    role: { type: String },
    link: { type: String },
    job_description: { type: String, required: true },
    job_summary: { type: String },
    generated_outputs: {
      cover_letter: { type: String },
      recruiter_dm: { type: String },
      short_pitch: { type: String },
      custom_qa: [
        {
          question: { type: String },
          answer: { type: String },
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export type JobApplicationDocument = IJobApplication;
