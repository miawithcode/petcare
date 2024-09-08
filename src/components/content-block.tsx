import { cn } from '@/lib/utils';

export default function ContentBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'h-full w-full overflow-hidden rounded-lg bg-white shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
