import { NextResponse } from 'next/server';
import { getCompleteProfileData } from '@/lib/utils/profile-data';
import { serializeToXML } from '@/lib/utils/serializers';

export async function GET() {
  const data = getCompleteProfileData();
  const xml = serializeToXML(data as Record<string, unknown>);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
