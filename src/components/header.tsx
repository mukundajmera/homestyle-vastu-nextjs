'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const Compass = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ring-offset-background">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-sm font-bold font-headline sm:text-lg">
            Homestyle Vastu
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
                pathname === item.href ? 'text-primary' : 'text-foreground/80'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation for Homestyle Vastu</SheetDescription>
              <div className="flex flex-col space-y-6 mt-6">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center space-x-2 mb-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Compass className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Homestyle Vastu</span>
                  </Link>
                </SheetClose>
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block rounded-sm px-3 py-3 text-lg font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          pathname === item.href
                            ? 'text-primary font-semibold'
                            : 'text-foreground/80'
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
