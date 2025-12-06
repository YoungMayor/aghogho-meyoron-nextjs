interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export default function SectionHeader({
  title,
  subtitle,
  alignment = 'center',
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const underlineClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div className={`mb-16 ${alignmentClasses[alignment]}`}>
      <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>}
      <div
        className={`h-1 w-24 rounded-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 dark:from-gray-600 dark:via-gray-400 dark:to-gray-600 ${underlineClasses[alignment]}`}
      ></div>
    </div>
  );
}
