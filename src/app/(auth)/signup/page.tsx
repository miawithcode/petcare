import AuthForm from '@/components/auth-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-semibold">Sign up</h1>
      <AuthForm type="signup" />
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-zinc-500">
          Login
        </Link>
      </p>
    </div>
  );
}
