import mongoose, { Schema, Model } from 'mongoose';

export interface IMentorshipApplication {
  name: string;
  email: string;
  phone?: string;
  background: string;
  goals: string;
  commitment: string;
  submitted_at: Date;
  ip_address: string;
  user_agent: string;
  recaptcha_score: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  reviewed_at?: Date;
  notes?: string;
}

const MentorshipApplicationSchema = new Schema<IMentorshipApplication>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    background: { type: String, required: true },
    goals: { type: String, required: true },
    commitment: { type: String, required: true },
    submitted_at: { type: Date, required: true, default: Date.now },
    ip_address: { type: String, required: true },
    user_agent: { type: String, required: true },
    recaptcha_score: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    reviewed_at: { type: Date },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const MentorshipApplication: Model<IMentorshipApplication> =
  mongoose.models.MentorshipApplication ||
  mongoose.model<IMentorshipApplication>('MentorshipApplication', MentorshipApplicationSchema);

export type MentorshipApplicationDocument = IMentorshipApplication;
