export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white h-full w-full overflow-hidden rounded-lg shadow-sm">
      {children}
    </div>
  );
}
