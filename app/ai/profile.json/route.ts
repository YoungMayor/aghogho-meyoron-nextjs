import { aiProfile } from '@/lib/data/ai_profile';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(aiProfile);
}
