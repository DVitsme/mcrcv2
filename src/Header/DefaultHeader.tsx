'use client'

import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTitle, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/utilities/ui'

// Define the types for our menu data
interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavbarProps {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
    signup: {
      title: string
      url: string
    }
  }
}

// --- Default Data (will be replaced by data fetched from Payload) ---
const defaultMenu: MenuItem[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  {
    title: 'Services',
    url: '/services',
    items: [
      {
        title: 'Mediation',
        description: 'Resolve disputes amicably with guided, neutral support.',
        icon: <Book className="size-5 shrink-0" />,
        url: '/services/mediation',
      },
      {
        title: 'Facilitation',
        description: 'Navigate complex conversations and group decisions effectively.',
        icon: <Trees className="size-5 shrink-0" />,
        url: '/services/facilitation',
      },
      {
        title: 'Restorative Justice',
        description: 'Repair harm and rebuild community trust through dialogue.',
        icon: <Sunset className="size-5 shrink-0" />,
        url: '/services/restorative-justice',
      },
    ],
  },
  { title: 'Events', url: '/events' },
  { title: 'Blog', url: '/blog' },
  { title: 'Contact', url: '/contact' },
]

// --- Main Header Component ---
export function DefaultHeader({
  logo = {
    url: '/',
    src: '/images/logo/mcrc-logo.png',
    alt: 'MCRC Logo',
    title: 'MCRC Howard',
  },
  menu = defaultMenu,
  auth = {
    login: { title: 'Login', url: '/admin' },
    signup: { title: 'Get Started', url: '/get-started' },
  },
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper component for Sub-menu links in mobile
  const SubMenuLink = ({ item }: { item: MenuItem }) => (
    <Link
      href={item.url}
      onClick={() => setIsMobileMenuOpen(false)}
      className="flex flex-row items-start gap-4 rounded-md p-3 text-left leading-none no-underline transition-colors outline-none hover:bg-muted"
    >
      {item.icon && <div className="mt-0.5 text-primary">{item.icon}</div>}
      <div>
        <div className="font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
        )}
      </div>
    </Link>
  )

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'md:py-3' : 'md:py-6', // Make header smaller on scroll
      )}
    >
      <div className="container">
        <div
          className={cn(
            'relative mx-auto bg-background transition-shadow duration-300 md:rounded-lg',
            isScrolled ? 'shadow-lg' : 'shadow-sm',
          )}
        >
          {/* Main nav container */}
          <nav className="relative z-10 flex items-center justify-between px-4 py-3 md:py-2">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} alt={logo.alt} width={32} height={32} />
              <span className="hidden font-semibold sm:inline-block">{logo.title}</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <SubMenuLink item={subItem} />
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.url} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          active={pathname === item.url}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex w-full flex-col sm:max-w-sm">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Main Menu</SheetTitle>
                    {/* The logo can also serve as a visual title if you prefer */}
                    <Link
                      href={logo.url}
                      className="flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Image src={logo.src} alt={logo.alt} width={32} height={32} />
                      <span className="font-semibold">{logo.title}</span>
                    </Link>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 pt-6">
                    {/* CORRECTED: Single Accordion wraps all items */}
                    <Accordion type="single" collapsible className="w-full">
                      {menu.map((item) =>
                        item.items ? (
                          <AccordionItem key={item.title} value={item.title}>
                            <AccordionTrigger className="text-md font-semibold hover:no-underline">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="pt-2">
                              <div className="flex flex-col gap-1">
                                {item.items.map((subItem) => (
                                  <SubMenuLink key={subItem.title} item={subItem} />
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              'flex w-full border-b py-4 text-md font-semibold',
                              pathname === item.url && 'text-primary',
                            )}
                          >
                            {item.title}
                          </Link>
                        ),
                      )}
                    </Accordion>
                  </nav>
                  {/* Auth buttons at the bottom of the sheet */}
                  <div className="mt-auto flex flex-col gap-2 pt-6">
                    <Button asChild variant="outline" size="lg">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild size="lg">
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
