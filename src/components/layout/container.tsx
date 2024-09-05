import { cn } from '@/lib/utils';

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-2xl px-6 md:px-16 lg:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
}
