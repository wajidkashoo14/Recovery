'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [recoveryServicesOpen, setRecoveryServicesOpen] = React.useState(false)

  return (
    <header className="
      sticky top-0 z-50 w-full
      border-b border-white/10
      bg-gradient-to-b from-black via-zinc-900 to-black
      backdrop-blur supports-[backdrop-filter]:bg-black/80
    ">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
            WalletRecover
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">

            {/* Home */}
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700'
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Resources */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-transparent text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700"
              >
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent className="
                bg-gradient-to-br from-zinc-900 via-black to-zinc-900
                border border-white/10 rounded-xl shadow-2xl
              ">
                <ul className="grid w-[400px] gap-3 p-4">
                  <ListItem href="/guides" title="Guides">
                    Step-by-step wallet recovery guides
                  </ListItem>
                  <ListItem href="/docs" title="Documentation">
                    Complete technical documentation
                  </ListItem>
                  <ListItem href="/case-studies" title="Case Studies">
                    Real recovery success stories
                  </ListItem>
                  <ListItem href="/faqs" title="FAQs">
                    Frequently asked questions
                  </ListItem>
                  <ListItem href="/security" title="Security Tips">
                    Best practices for wallet security
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Wallet Recovery */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-transparent text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700"
              >
                Wallet Recovery
              </NavigationMenuTrigger>
              <NavigationMenuContent className="
                bg-gradient-to-br from-zinc-900 via-black to-zinc-900
                border border-white/10 rounded-xl shadow-2xl
              ">
                <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">

                  {/* Nested Recovery Services */}
                  <li
                    className="relative"
                    onMouseEnter={() => setRecoveryServicesOpen(true)}
                    onMouseLeave={() => setRecoveryServicesOpen(false)}
                  >
                    <div className="
                      flex items-center justify-between rounded-lg p-3
                      cursor-pointer transition-all
                      text-white/80 hover:text-white
                      hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700
                    ">
                      <div>
                        <div className="text-sm font-medium">
                          Recovery Services
                        </div>
                        <p className="text-sm text-white/50">
                          Specialized wallet recovery
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>

                    {recoveryServicesOpen && (
                      <div className="
                        absolute left-full top-0 ml-2 w-56 p-2
                        bg-gradient-to-br from-black via-zinc-900 to-black
                        border border-white/10 rounded-xl shadow-2xl z-50
                      ">
                        {[
                          'Bitcoin Recovery',
                          'Ethereum Recovery',
                          'Trust Wallet',
                          'MetaMask',
                          'Ledger',
                        ].map((item) => (
                          <Link
                            key={item}
                            href="/"
                            className="
                              block px-3 py-2 text-sm rounded-md
                              text-white/80 hover:text-white
                              hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700
                              transition-all
                            "
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>

                  <ListItem href="/lost-password" title="Lost Password">
                    Recover locked wallets
                  </ListItem>
                  <ListItem href="/seed-phrase" title="Seed Phrase Help">
                    Restore wallets securely
                  </ListItem>
                  <ListItem href="/hacked-wallet" title="Hacked Wallet">
                    Secure compromised wallets
                  </ListItem>
                  <ListItem href="/scam-recovery" title="Scam Recovery">
                    Recover scammed funds
                  </ListItem>
                  <ListItem href="/urgent-recovery" title="Urgent Recovery">
                    24/7 emergency assistance
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Pricing */}
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700'
                  )}
                >
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Blog */}
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700'
                  )}
                >
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA */}
        <Button
          size="lg"
          className="hidden md:inline-flex bg-white text-black font-semibold hover:bg-zinc-200"
        >
          Recover Your Wallet
        </Button>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="
              w-80 bg-gradient-to-b from-black via-zinc-900 to-black
              text-white border-l border-white/10
            "
          >
            <nav className="mt-8 flex flex-col gap-4">
              <Link href="/" className="text-lg font-semibold text-white/80 hover:text-white">
                Home
              </Link>
              <Link href="/pricing" className="text-lg font-semibold text-white/80 hover:text-white">
                Pricing
              </Link>
              <Link href="/blog" className="text-lg font-semibold text-white/80 hover:text-white">
                Blog
              </Link>
              <Button className="mt-4 bg-white text-black hover:bg-zinc-200">
                Recover Your Wallet
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}

/* Helper Component */
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; href: string }
>(({ title, children, href, className, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          `
          block rounded-lg p-3 transition-all
          text-white/80 hover:text-white
          hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700
          `,
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm text-white/50">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
))
ListItem.displayName = 'ListItem'
