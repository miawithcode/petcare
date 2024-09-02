export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-6 md:px-16 lg:px-20">
      {children}
    </div>
  );
}
