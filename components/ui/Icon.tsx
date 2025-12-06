import Image from 'next/image';

interface IconProps {
  type: 'devicon' | 'simpleicon' | 'image';
  value: string;
  color?: string | null;
  size?: number;
  className?: string;
}

/**
 * Icon component that renders icons based on type
 * - devicon: Uses Devicon class names (e.g., 'devicon-react-original')
 * - simpleicon: Uses lucide-react or similar icon library with icon names
 * - image: Uses Next.js Image component to render an image
 */
export default function Icon({ type, value, color, size = 20, className = '' }: IconProps) {
  if (type === 'devicon') {
    // For devicon, we use the Devicon font icons
    // Format: devicon-{value}
    const iconClass = value.startsWith('devicon-') ? value : `devicon-${value}`;
    
    return (
      <i
        className={`${iconClass} ${className}`}
        style={{
          fontSize: `${size}px`,
          color: color || 'currentColor',
        }}
      />
    );
  }

  if (type === 'image') {
    // For image type, render using Next.js Image
    return (
      <Image
        src={value}
        alt="Icon"
        width={size}
        height={size}
        className={className}
      />
    );
  }

  if (type === 'simpleicon') {
    // For simpleicons/lucide icons, we render a simple SVG placeholder
    // NOTE: This is a placeholder implementation. In production, integrate with
    // a proper icon library like lucide-react or simple-icons for actual icon rendering
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color || 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {/* Default circle icon - replace with actual icon implementation */}
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  return null;
}
