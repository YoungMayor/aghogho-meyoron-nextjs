import { iconUrl } from '@/components/ui/Icon';
import { technicalSkills } from '@/lib/data/skills';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
    }
    return c;
  });
}

export async function GET() {
  const width = 800;
  const padding = 20;
  const categoryGap = 40;
  const iconSize = 40;
  const iconGap = 20;
  const titleHeight = 30;

  // Calculate generic height
  let currentY = padding;
  let totalHeight = padding;

  // Measurement pass
  technicalSkills.forEach((category) => {
    currentY += titleHeight + 10; // Title + margin
    const iconsPerRow = Math.floor((width - 2 * padding) / (iconSize + iconGap));
    const rows = Math.ceil(category.icons.length / iconsPerRow);
    currentY += rows * (iconSize + iconGap);
    currentY += categoryGap;
  });
  totalHeight = currentY;

  const svgContent = `
    <svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <style>
        .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: bold; fill: #333; }
        .icon-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; fill: #666; text-anchor: middle; }
        @media (prefers-color-scheme: dark) {
          .title { fill: #fff; }
          .icon-label { fill: #ccc; }
          rect { fill: #0d1117; }
        }
      </style>
      <rect width="100%" height="100%" fill="transparent" />
      ${technicalSkills
        .map((category, catIndex) => {
          let catY = padding;
          // Calculate Y offset based on previous categories
          for (let i = 0; i < catIndex; i++) {
            const prevCat = technicalSkills[i];
            const iconsPerRow = Math.floor((width - 2 * padding) / (iconSize + iconGap));
            const rows = Math.ceil(prevCat.icons.length / iconsPerRow);
            catY += titleHeight + 10 + rows * (iconSize + iconGap) + categoryGap;
          }

          const categoryTitle = `<text x="${padding}" y="${catY + 20}" class="title">${escapeXml(category.name)}</text>`;

          const icons = category.icons
            .map((icon, iconIndex) => {
              const iconsPerRow = Math.floor((width - 2 * padding) / (iconSize + iconGap));
              const row = Math.floor(iconIndex / iconsPerRow);
              const col = iconIndex % iconsPerRow;
              const x = padding + col * (iconSize + iconGap);
              const y = catY + titleHeight + 10 + row * (iconSize + iconGap);

              const iconSrc = iconUrl(icon);

              return `
                <g transform="translate(${x}, ${y})">
                  <image href="${iconSrc}" width="${iconSize}" height="${iconSize}" />
                </g>
              `;
            })
            .join('');

          return categoryTitle + icons;
        })
        .join('')}
    </svg>
  `;

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
