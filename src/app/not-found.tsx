import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="container mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="font-headline text-4xl font-semibold md:text-5xl">This page is out of alignment</h1>
      <p className="mt-5 text-lg leading-8 text-foreground/85">
        The page you were looking for does not exist or has moved. Head back home or browse the services.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="font-semibold">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-accent font-semibold text-terracotta-ink hover:bg-accent/10 hover:text-terracotta-ink">
          <Link href="/services">View services</Link>
        </Button>
      </div>
    </section>
  );
}
