import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        className={`relative flex min-h-svh flex-col bg-zinc-100 text-zinc-900 antialiased ${inter.className}`}
      >
        <main className="flex-1 flex-grow">{children}</main>
      </body>
    </html>
  );
}
