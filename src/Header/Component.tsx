'use client'
import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react'

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
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface Navbar1Props {
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

const Header = ({
  logo = {
    url: '/',
    src: 'https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg',
    alt: 'logo',
    title: 'MCRC Howard',
  },
  menu = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    {
      title: 'Services',
      url: '/services',
      items: [
        {
          title: 'Mediation',
          description: 'The latest industry news, updates, and info',
          icon: <Book className="size-5 shrink-0" />,
          url: '/services/mediation',
        },
        {
          title: 'Facilitation',
          description: 'Our mission is to innovate and empower the world',
          icon: <Trees className="size-5 shrink-0" />,
          url: '/services/facilitation',
        },
        {
          title: 'Restorative Justice',
          description: 'Browse job listing and discover our workspace',
          icon: <Sunset className="size-5 shrink-0" />,
          url: '/services/restorative-justice',
        },
      ],
    },
    {
      title: 'Resources',
      url: '/resources',
      items: [
        {
          title: 'Help Center',
          description: 'Get all the answers you need right here',
          icon: <Zap className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Contact Us',
          description: 'We are here to help you with any questions you have',
          icon: <Sunset className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Status',
          description: 'Check the current status of our services and APIs',
          icon: <Trees className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Terms of Service',
          description: 'Our terms and conditions for using our services',
          icon: <Book className="size-5 shrink-0" />,
          url: '#',
        },
      ],
    },
    {
      title: 'Events',
      url: '/events',
    },
    {
      title: 'Blog',
      url: '/blog',
    },
    {
      title: 'Contact',
      url: '/contact',
    },
  ],
  auth = {
    login: { title: 'Login', url: '/admin' },
    signup: { title: 'Get Started', url: '/get-started' },
  },
}: Navbar1Props) => {
  return (
    <section className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} className="max-h-8" alt={logo.alt} width={32} height={32} />
              <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <a
                    href={subItem.url}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      {subItem.icon}
                      <div className="text-sm font-medium leading-none">{subItem.title}</div>
                    </div>
                    {subItem.description && (
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {subItem.description}
                      </p>
                    )}
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
        )}
      </div>
    </a>
  )
}

export { Header }
