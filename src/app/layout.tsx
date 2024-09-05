import type { Metadata } from 'next';
import localfont from 'next/font/local';
import '../styles/globals.css';
import { cn } from '@/lib/utils';

const satoshi = localfont({
  src: [
    {
      path: '../fonts/Satoshi-Variable.ttf',
    },
  ],
  variable: '--font-satoshi',
});

export const metadata: Metadata = {
  title: 'Petcare - Pet daycare management system',
  description: "Take care of people's pets responsibly with Petcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          'font-satoshi relative flex min-h-svh flex-col antialiased',
          satoshi.variable,
        )}
      >
        <main className="flex-1 flex-grow">{children}</main>
      </body>
    </html>
  );
}
