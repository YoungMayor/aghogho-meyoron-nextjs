import Image from 'next/image';
import { Icon as IconData } from '@/lib/types';

interface IconProps {
  type: 'devicon' | 'simpleicon' | 'skillicon' | 'image';
  value: string;
  color?: string | null;
  size?: number;
  className?: string;
}

/**
 * Icon component that renders icons from CDNs
 * - devicon: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/[folder]/[value].svg
 * - simpleicon: https://cdn.simpleicons.org/[value]/[color]
 * - skillicon: https://skillicons.dev/icons?i=[value]
 * - image: Direct URL
 */
export default function Icon({ type, value, color, size = 40, className = '' }: IconProps) {
  let src = '';
  const alt = `${value} icon`;

  if (type === 'devicon') {
    // Handle edge cases where folder name has hyphens (e.g. dot-net)
    const folder = value.startsWith('dot-net') ? 'dot-net' : value.split('-')[0];
    src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${folder}/${value}.svg`;
  } else if (type === 'simpleicon') {
    const colorPart = color ? `/${color}` : '';
    src = `https://cdn.simpleicons.org/${value}${colorPart}`;
  } else if (type === 'skillicon') {
    src = `https://skillicons.dev/icons?i=${value}`;
  } else if (type === 'image') {
    src = value;
  }

  if (!src) return null;

  return <Image src={src} alt={alt} width={size} height={size} className={className} unoptimized />;
}

interface FromIconProps {
  icon: IconData;
  size?: number;
  className?: string;
}

Icon.fromIcon = function FromIcon({ icon, size, className }: FromIconProps) {
  return (
    <Icon
      type={icon.type}
      value={icon.value}
      color={icon.color}
      size={size}
      className={className}
    />
  );
};
