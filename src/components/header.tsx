'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/brand-mark';
import { Sheet, SheetClose, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center gap-2.5 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <BrandMark className="h-8 w-8" />
          <span className="font-headline text-lg font-semibold leading-none tracking-tight sm:text-xl">
            Homestyle Vastu
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative rounded-sm px-3 py-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                pathname === item.href
                  ? 'text-primary after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-primary'
                  : 'text-foreground/80'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.title}
            </Link>
          ))}
          <Button asChild className="ml-3 h-10 px-5 font-semibold">
            <Link href="/contact">Book a consultation</Link>
          </Button>
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation for Homestyle Vastu</SheetDescription>
              <div className="mt-6 flex flex-col space-y-6">
                <SheetClose asChild>
                  <Link href="/" className="mb-4 flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <BrandMark className="h-8 w-8" />
                    <span className="font-headline text-lg font-semibold">Homestyle Vastu</span>
                  </Link>
                </SheetClose>
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block rounded-sm px-3 py-3 text-lg font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          pathname === item.href ? 'font-semibold text-primary' : 'text-foreground/80'
                        )}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
