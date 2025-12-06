import mongoose, { Schema, Model } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: Date;
  ip_address: string;
  user_agent: string;
  recaptcha_score: number;
  status: 'new' | 'read' | 'replied';
  replied_at?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    submitted_at: { type: Date, required: true, default: Date.now },
    ip_address: { type: String, required: true },
    user_agent: { type: String, required: true },
    recaptcha_score: { type: Number, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    replied_at: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export type ContactDocument = IContact;
