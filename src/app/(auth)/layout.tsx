import Logo from '@/components/logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-5">
      {/* <Logo /> */}
      {children}
    </div>
  );
}
