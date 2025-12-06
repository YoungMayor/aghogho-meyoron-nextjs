import mongoose, { Schema, Model } from 'mongoose';

/**
 * Mongoose connection state
 */
let isConnected = false;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize global mongoose cache if not exists
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using Mongoose
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected && global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your MONGODB_URI to .env.local');
  }

  if (!global.mongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongooseCache.promise = mongoose.connect(uri, opts);
  }

  try {
    global.mongooseCache.conn = await global.mongooseCache.promise;
    isConnected = true;
    return global.mongooseCache.conn;
  } catch (error) {
    global.mongooseCache.promise = null;
    throw error;
  }
}

/**
 * Contact document interface
 */
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

/**
 * Mentorship application document interface
 */
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

/**
 * Contact schema
 */
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

/**
 * Mentorship application schema
 */
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

/**
 * Get or create Contact model
 */
export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

/**
 * Get or create MentorshipApplication model
 */
export const MentorshipApplication: Model<IMentorshipApplication> =
  mongoose.models.MentorshipApplication ||
  mongoose.model<IMentorshipApplication>(
    'MentorshipApplication',
    MentorshipApplicationSchema
  );

// Export for backward compatibility
export type ContactDocument = IContact;
export type MentorshipApplicationDocument = IMentorshipApplication;
