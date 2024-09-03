import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/signup">Get Started</Link>
      </Button>
      <Button asChild variant={'secondary'}>
        <Link href="/login">Log in</Link>
      </Button>
    </div>
  );
}
