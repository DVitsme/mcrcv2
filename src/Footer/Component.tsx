import { FaInstagram, FaLinkedin, FaRedditAlien, FaTelegramPlane, FaTwitter } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'

const sections = [
  {
    title: 'Product',
    links: [
      { name: 'Overview', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Marketplace', href: '#' },
      { name: 'Features', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Team', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'Advertise', href: '#' },
    ],
  },
]

interface Footer3Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
}
const Footer = ({
  logo = {
    url: '/',
    src: '/images/logo/mcrc-logo.png',
    alt: 'logo',
    title: 'MCRC Howard County',
  },
}: Footer3Props) => {
  return (
    <section className="py-32 bg-tertiary text-tertiary-foreground">
      <div className="container">
        <footer>
          {/* Logo */}
          <div className="flex items-center gap-2 lg:justify-start">
            <Link href={logo.url}>
              <Image
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="h-12"
                width={48}
                height={48}
              />
            </Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-2 xl:col-span-1">
              <ul className="mb-10 flex items-center gap-2 text-muted-foreground">
                <li className="font-medium">
                  <Link href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaInstagram className="size-6" />
                    </span>
                  </Link>
                </li>
                <li className="font-medium">
                  <Link href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaRedditAlien className="size-6" />
                    </span>
                  </Link>
                </li>
                <li className="font-medium">
                  <Link href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaTwitter className="size-6" />
                    </span>
                  </Link>
                </li>
                <li className="font-medium">
                  <Link href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaTelegramPlane className="size-6" />
                    </span>
                  </Link>
                </li>
                <li className="font-medium">
                  <Link href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaLinkedin className="size-6" />
                    </span>
                  </Link>
                </li>
              </ul>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Subscribe to our newsletter</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  By submitting, you agree to our
                  <Link href="#" className="ml-1 text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-24 flex flex-col flex-wrap justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} MCRC Howard County. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="whitespace-nowrap underline hover:text-primary">
                <Link href="#">Terms and Conditions</Link>
              </li>
              <li className="whitespace-nowrap underline hover:text-primary">
                <Link href="#">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer }
