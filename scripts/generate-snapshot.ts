import { getCompleteProfileData } from '@/lib/utils/profile-data';
import { serializeToXML } from '@/lib/utils/serializers';
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

async function generateSnapshot() {
  try {
    console.log('Generating profile snapshots...');
    const data = getCompleteProfileData();
    const now = new Date();
    const timestamp = now.toISOString();

    const safeTimestamp = timestamp.replace(/:/g, '-').replace(/\..+/, '');

    const snapshotData = {
      _generatedAt: timestamp,
      ...data,
    };

    const snapshotDir = path.join(process.cwd(), 'profile-snapshots', safeTimestamp);

    await fs.mkdir(snapshotDir, { recursive: true });

    const baseFilename = `aghogho-meyoron-${safeTimestamp}`;

    // 1. JSON
    await fs.writeFile(
      path.join(snapshotDir, `${baseFilename}.json`),
      JSON.stringify(snapshotData, null, 2)
    );

    console.log(`Created JSON: ${snapshotDir}/${baseFilename}.json`);

    // 2. XML
    const xmlContent = serializeToXML(snapshotData as Record<string, unknown>);

    await fs.writeFile(path.join(snapshotDir, `${baseFilename}.xml`), xmlContent);

    console.log(`Created XML: ${snapshotDir}/${baseFilename}.xml`);

    // 3. YAML
    const yamlContent = yaml.dump(snapshotData);

    await fs.writeFile(path.join(snapshotDir, `${baseFilename}.yaml`), yamlContent);

    console.log(`Created YAML: ${snapshotDir}/${baseFilename}.yaml`);

    console.log('Snapshots generated successfully.');
  } catch (error) {
    console.error('Failed to generate snapshots:', error);
    process.exit(1);
  }
}

generateSnapshot();
