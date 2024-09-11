import Decoration from '@/components/decoration';
import Footer from '@/components/footer';
import Container from '@/components/layout/container';
import Logo from '@/components/logo';
import SectionHeading from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { priceFeatures } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Container className="flex h-full min-h-svh flex-col">
      <Header />
      <div className="flex-1 flex-grow">
        <Hero />
        <AppScreenshot />
      </div>
      <Footer />
    </Container>
  );
}

function Header() {
  return (
    <header className="flex w-full items-center justify-between py-6">
      <Logo />

      <div className="flex items-center gap-x-2">
        <Button asChild variant="secondary">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button asChild variant={'outline'}>
          <Link href="/app/dashboard">Launch App</Link>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="flex w-full flex-col items-center justify-center py-16 text-center">
      <h1 className="font-playfair max-w-xl text-balance text-3xl leading-relaxed tracking-tight md:text-6xl">
        Manage your <span className="italic">pet daycare</span> with ease.
      </h1>
      <h2 className="mt-4 max-w-prose">
        A smart, reliable system designed to make pet daycare management a
        breeze.
      </h2>
      <PriceCard className="mt-8" />
    </section>
  );
}

function PriceCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        'relative mx-auto w-full max-w-[345px] px-6 py-4 shadow-lg transition',
        className,
      )}
    >
      <section>
        <div className="flex items-center justify-between py-0 font-bold">
          <h3 className="font-bold">Features & pricing</h3>
          <div className="flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
            $200 / lifetime
          </div>
        </div>
        <CardContent className="mt-2.5 p-0">
          <ul className="space-y-2">
            {priceFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center text-xs font-semibold"
              >
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5"
                >
                  <path
                    className=""
                    d="M4.00005 6.5998L9.90005 0.699805C10.0834 0.516471 10.3167 0.424805 10.6 0.424805C10.8834 0.424805 11.1167 0.516471 11.3 0.699805C11.4834 0.883138 11.575 1.11647 11.575 1.3998C11.575 1.68314 11.4834 1.91647 11.3 2.0998L4.70005 8.69981C4.50005 8.89981 4.26672 8.9998 4.00005 8.9998C3.73338 8.9998 3.50005 8.89981 3.30005 8.69981L0.700049 6.0998C0.516715 5.91647 0.425049 5.68314 0.425049 5.3998C0.425049 5.11647 0.516715 4.88314 0.700049 4.6998C0.883382 4.51647 1.11672 4.4248 1.40005 4.4248C1.68338 4.4248 1.91672 4.51647 2.10005 4.6998L4.00005 6.5998Z"
                    fill="#0E3934"
                  ></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <Button asChild className="mt-4 w-full font-bold" size="sm">
          <Link href="/signup">Get Started</Link>
        </Button>
      </section>

      <Decoration className="left-[-60px] top-[-55px]" />
      <Decoration
        className="left-[-55px] top-1/2 -translate-y-1/2"
        color="red"
      />
      <Decoration className="bottom-[-60px] left-[-55px]" color="yellow" />
      <Decoration
        className="bottom-[-50px] left-1/2 -translate-x-1/2"
        color="red"
      />
      <Decoration
        className="right-[-55px] top-1/2 -translate-y-1/2"
        color="red"
      />
      <Decoration className="right-[-55px] top-[-60px]" color="yellow" />
      <Decoration
        className="left-1/2 top-[-50px] -translate-x-1/2"
        color="red"
      />
      <Decoration className="bottom-[-60px] right-[-55px]" />
    </Card>
  );
}

function AppScreenshot({ className }: { className?: string }) {
  return (
    <div className="py-16">
      <SectionHeading>Take care of your furry friends</SectionHeading>
      <div
        className={cn(
          'relative mx-auto mt-2 aspect-[1.5565789474] w-full max-w-screen-md overflow-hidden rounded-lg shadow-lg',
          className,
        )}
      >
        <Image
          fill
          alt="App Screenshot"
          className="object-cover"
          src="/images/app-screenshot.png"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
