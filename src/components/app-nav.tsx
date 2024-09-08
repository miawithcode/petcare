'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { label: 'dashboard', href: '/app/dashboard' },
  { label: 'account', href: '/app/account' },
];

export default function AppNav() {
  const currentPath = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {routes.map((route) => (
          <li
            key={route.label}
            className={cn(
              'relative px-2 py-2 font-medium capitalize tracking-wide text-muted-foreground transition',
              {
                'text-black': currentPath === route.href,
              },
            )}
          >
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
