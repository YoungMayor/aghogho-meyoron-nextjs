import { Icon as IconData } from '@/lib/types';
import CustomIcon from '@mayrlabs/web-icon/next';

interface IconProps {
  type: 'dev' | 'simple';
  value: string;
  size?: number;
  className?: string;
}

export default function Icon({ type, value, size = 40, className = '' }: IconProps) {
  return <CustomIcon icon={`${type}:${value}`} unoptimized size={size} />;
}

interface FromIconProps {
  icon: IconData;
  size?: number;
  className?: string;
}

Icon.fromIcon = function FromIcon({ icon, size, className }: FromIconProps) {
  return <Icon type={icon.type} value={icon.value} size={size} className={className} />;
};
