import Bird from '@/components/illustration/bird';
import Cat from '@/components/illustration/cat';
import Dog from '@/components/illustration/dog';
import Hamster from '@/components/illustration/hamster';
import Container from '@/components/layout/container';
import SectionHeading from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { priceFeatures, reviews } from '@/lib/constants';
import { type Review } from '@/lib/types';
import { cn } from '@/lib/utils';
import { QuoteIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Header />
      <Hero />
      <Pricing />
      <Reviews />
      <CallToAction />
      <Footer />
    </Container>
  );
}

function GetStartedButton({ className }: { className?: string }) {
  return (
    <Button asChild className={className}>
      <Link href="/signup">Get Started</Link>
    </Button>
  );
}

function Header() {
  return (
    <header className="flex w-full items-center justify-between py-6">
      <Link href="/" className="text-xl font-bold">
        Pet<span className="text-primary">care</span>
      </Link>

      <div className="flex items-center gap-x-2">
        <GetStartedButton />
        <Button asChild variant={'outline'}>
          <Link href="/login">Launch App</Link>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="flex w-full flex-col items-center justify-center py-16 text-center">
      <h1 className="max-w-4xl text-balance text-3xl font-bold md:text-5xl">
        Transform your pet daycare business with our{' '}
        <span className="text-primary">easy management tools</span>.
      </h1>
      <p className="mt-4 max-w-prose">
        A smart, reliable system designed to make pet daycare management a
        breeze.
      </p>
      <GetStartedButton className="mt-8" />
      <AppScreenshot className="mt-16" />
    </section>
  );
}

function AppScreenshot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-video w-full rounded-lg bg-white shadow-md lg:max-w-screen-lg',
        className,
      )}
    >
      <Hamster className="absolute -left-4 -top-8 w-14 lg:-left-[2rem] lg:-top-[2rem] lg:w-24" />
      <Bird className="absolute -right-9 -top-16 w-16 lg:-right-[4rem] lg:-top-[4.5rem] lg:w-24" />
      <Cat className="absolute -bottom-16 -left-9 w-24 lg:-bottom-[4rem] lg:-left-[4rem] lg:w-32" />
      <Dog className="absolute -bottom-20 -right-9 w-32 lg:-bottom-[4.5rem] lg:-right-[4rem] lg:w-44" />
    </div>
  );
}

function Pricing() {
  return (
    <section className="flex w-full flex-col items-center justify-center py-16">
      <SectionHeading title="One Payment, Lifetime Access" subtitle="pricing" />
      <PriceCard className="mt-12" />
    </section>
  );
}

function PriceCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        'flex w-full max-w-sm flex-col items-center justify-center px-12 py-9 ring-2 ring-primary/50 transition',
        className,
      )}
    >
      <CardHeader className="py-0 text-2xl font-bold">$200</CardHeader>
      <CardDescription className="mt-2 text-base">
        Experience hassle-free pet daycare management with our comprehensive
        feature set.
      </CardDescription>
      <CardContent className="mt-4 self-start">
        <ul className="-ml-2 list-disc space-y-2">
          {priceFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="w-full px-0 py-0">
        <Button className="w-full">Select</Button>
      </CardFooter>
    </Card>
  );
}

function Reviews() {
  return (
    <section className="py-16">
      <SectionHeading title="Our clients are saying" subtitle="Reviews" />

      <div className="container mx-auto mt-12 h-full">
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {reviews.map((review) => (
            <ReviewCard key={review.owner} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="break-inside-avoid px-8 py-4">
      <QuoteIcon className="h-8 w-8 text-primary" />
      <CardContent className="mt-3 px-0">
        <p>{review.review}</p>
      </CardContent>
      <CardFooter className="px-0">
        <div className="relative size-12 rounded-full">
          <Image
            alt={review.owner}
            fill
            src={review.imageUrl}
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="ml-2">
          <p className="text-sm">{review.owner}</p>
          <p className="text-sm font-bold">{review.store}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

function CallToAction() {
  return (
    <section className="flex w-full flex-col items-center py-16">
      <SectionHeading title="Don't hesitate to success" />
      <GetStartedButton className="mt-8 w-fit" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Petcare
    </footer>
  );
}
