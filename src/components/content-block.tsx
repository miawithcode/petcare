export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}
