type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-semibold lg:text-3xl">{children}</h2>
    </div>
  );
}
