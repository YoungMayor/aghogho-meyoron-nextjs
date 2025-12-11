import { NextResponse } from 'next/server';
import { getCompleteProfileData } from '@/lib/utils/profile-data';
import yaml from 'js-yaml';

export async function GET() {
  const data = getCompleteProfileData();
  const yamlString = yaml.dump(data);

  return new NextResponse(yamlString, {
    headers: {
      'Content-Type': 'application/x-yaml',
    },
  });
}
