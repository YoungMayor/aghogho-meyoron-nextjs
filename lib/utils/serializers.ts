export function serializeToXML(data: Record<string, unknown>): string {
  const buildXML = (obj: Record<string, unknown>): string => {
    let xml = '';
    for (const prop in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;

      const value = obj[prop];
      const safeKey = prop.replace(/[^a-zA-Z0-9]/g, '_');

      if (Array.isArray(value)) {
        xml += `<${safeKey}>`;
        for (const item of value) {
          xml += `<item>`;
          if (typeof item === 'object' && item !== null) {
            xml += buildXML(item as Record<string, unknown>);
          } else {
            xml += String(item).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          }
          xml += `</item>`;
        }
        xml += `</${safeKey}>`;
      } else if (typeof value === 'object' && value !== null) {
        xml += `<${safeKey}>`;
        xml += buildXML(value as Record<string, unknown>);
        xml += `</${safeKey}>`;
      } else {
        xml += `<${safeKey}>${String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</${safeKey}>`;
      }
    }
    return xml;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<profile>
  ${buildXML(data)}
</profile>`;
}
