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
            className={cn('relative px-4 py-2 text-sm capitalize transition', {
              'text-white': currentPath === route.href,
            })}
          >
            <Link href={route.href}>{route.label}</Link>

            {currentPath === route.href && (
              <motion.span
                layoutId="nav-active-link"
                className="absolute inset-0 -z-10 rounded bg-primary"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
