type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="text-lg capitalize text-primary">{subtitle}</p>
      <h2 className="text-2xl font-bold lg:text-4xl">{title}</h2>
    </div>
  );
}
