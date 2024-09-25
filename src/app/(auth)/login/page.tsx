import AuthForm from '@/components/auth-form';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
      <AuthForm type="login" />
      <p className="mt-4 text-sm">
        No account yet?{' '}
        <Link href="/signup" className="text-zinc-500">
          Sign up
        </Link>
      </p>
    </div>
  );
}
