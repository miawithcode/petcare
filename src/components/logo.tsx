import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('text-xl font-bold', className)}>
      Pet<span className="text-primary">care</span>
    </Link>
  );
}
