import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function Icon({ name, className, filled = false }: IconProps) {
  return (
    <span
      className={cn(
        'material-symbols-outlined',
        filled && 'filled',
        className
      )}
    >
      {name}
    </span>
  );
}
