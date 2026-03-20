import { NextResponse } from 'next/server';
import { getCompleteProfileData } from '@/lib/utils/profile-data';
import { serializeToXML } from '@/lib/utils/serializers';
import yaml from 'js-yaml';

export async function generateStaticParams() {
  return [{ format: 'json' }, { format: 'xml' }, { format: 'yaml' }];
}

export async function GET(request: Request, { params }: { params: Promise<{ format: string }> }) {
  const { format } = await params;
  const data = getCompleteProfileData();

  switch (format.toLowerCase()) {
    case 'xml': {
      const xml = serializeToXML(data as Record<string, unknown>);
      return new NextResponse(xml, {
        headers: { 'Content-Type': 'application/xml' },
      });
    }

    case 'yaml':
    case 'yml': {
      const yamlString = yaml.dump(data);
      return new NextResponse(yamlString, {
        headers: { 'Content-Type': 'application/x-yaml' },
      });
    }

    case 'json': {
      return NextResponse.json(data);
    }

    default: {
      return NextResponse.json({ error: 'Unsupported profile format' }, { status: 404 });
    }
  }
}
