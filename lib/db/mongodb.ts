import { MongoClient, Db, Collection, Document } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Get or create MongoDB client promise
 */
function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your MONGODB_URI to .env.local');
  }

  const options = {};

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
const clientPromiseGetter = () => getClientPromise();
export default clientPromiseGetter;

/**
 * Get MongoDB database instance
 */
export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}

/**
 * Get a specific collection
 */
export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T>> {
  const db = await getDatabase();
  return db.collection<T>(name);
}

/**
 * Collection names
 */
export const Collections = {
  CONTACTS: 'contacts',
  MENTORSHIP_APPLICATIONS: 'mentorship_applications',
} as const;

/**
 * Database schema types
 */
export interface ContactDocument {
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

export interface MentorshipApplicationDocument {
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
