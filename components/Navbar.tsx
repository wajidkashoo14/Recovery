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

/* ---------------- DATA ---------------- */

const recoveryServices = [
  { label: 'Bitcoin Recovery', href: '/bitcoin-recovery' },
  { label: 'Ethereum Recovery', href: '/ethereum-recovery' },
  { label: 'Trust Wallet', href: '/trust-wallet' },
  { label: 'MetaMask', href: '/metamask' },
  { label: 'Ledger', href: '/ledger' },
]

const otherRecoveryOptions = [
  { label: 'Lost Password', href: '/lost-password', desc: 'Access locked wallets' },
  { label: 'Seed Phrase', href: '/seed-phrase', desc: 'Restore from phrase' },
  { label: 'Hacked Wallet', href: '/hacked-wallet', desc: 'Secure stolen funds' },
  { label: 'Scam Recovery', href: '/scam-recovery', desc: 'Recover scammed crypto' },
  { label: 'Wrong Transfer', href: '/wrong-transfer', desc: 'Retrieve mistaken sends' },
  { label: 'DeFi Recovery', href: '/defi-recovery', desc: 'Smart contract recovery' },
  { label: 'NFT Recovery', href: '/nft-recovery', desc: 'Recover lost NFTs' },
  { label: 'Exchange Issues', href: '/exchange-issues', desc: 'Exchange problems' },
  { label: 'Urgent Recovery', href: '/urgent-recovery', desc: '24/7 emergency help' },
]

/* ---------------- COMPONENT ---------------- */

export default function Navbar() {
  const [openNested, setOpenNested] = React.useState(false)

  return (
    <header className="
      sticky top-0 z-50 w-full
      bg-gradient-to-b from-black via-zinc-900 to-black
      border-b border-white/10
    ">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white tracking-wide">
          WalletRecover
        </Link>

        {/* ---------------- DESKTOP NAV ---------------- */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">

            <NavLink href="/">Home</NavLink>

            {/* Resources */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerStyle}>
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent className={dropdownStyle}>
                <ul className="grid w-[400px] gap-3 p-4">
                  <ListItem href="/guides" title="Guides">Step-by-step guides</ListItem>
                  <ListItem href="/docs" title="Documentation">Technical docs</ListItem>
                  <ListItem href="/case-studies" title="Case Studies">Real stories</ListItem>
                  <ListItem href="/faqs" title="FAQs">Common questions</ListItem>
                  <ListItem href="/security" title="Security">Best practices</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Wallet Recovery */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerStyle}>
                Wallet Recovery
              </NavigationMenuTrigger>
              <NavigationMenuContent className={dropdownStyle}>
                <ul className="grid w-[600px] grid-cols-2 gap-3 p-4">

                  {/* Nested menu */}
                  <li
                    className="relative"
                    onMouseEnter={() => setOpenNested(true)}
                    onMouseLeave={() => setOpenNested(false)}
                  >
                    <div className={nestedTriggerStyle}>
                      <div>
                        <p className="font-medium">Recovery Services</p>
                        <p className="text-sm text-white/50">Wallet specific help</p>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>

                    {openNested && (
                      <div className={nestedMenuStyle}>
                        {recoveryServices.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={nestedItemStyle}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>

                  {otherRecoveryOptions.map(item => (
                    <ListItem key={item.label} href={item.href} title={item.label}>
                      {item.desc}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/blog">Blog</NavLink>

          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA */}
        <Button className="hidden md:inline-flex bg-white text-black hover:bg-zinc-200">
          Recover Your Wallet
        </Button>

        {/* ---------------- MOBILE NAV ---------------- */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden text-white hover:bg-zinc-800"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              bg-gradient-to-b from-black via-zinc-900 to-black
              text-white border-l border-white/10 p-4 w-80 overflow-y-auto
            "
          >
            <nav className="mt-8 flex flex-col gap-4">

              <MobileLink href="/">Home</MobileLink>

              {/* Resources */}
              <details className="group">
                <summary className={mobileSummary}>
                  Resources 
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <MobileGroup>
                  <MobileLink href="/guides">Guides</MobileLink>
                  <MobileLink href="/docs">Documentation</MobileLink>
                  <MobileLink href="/case-studies">Case Studies</MobileLink>
                  <MobileLink href="/faqs">FAQs</MobileLink>
                  <MobileLink href="/security">Security Tips</MobileLink>
                </MobileGroup>
              </details>

              {/* Wallet Recovery */}
              <details className="group">
                <summary className={mobileSummary}>
                  Wallet Recovery 
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <MobileGroup>
                  
                  {/* Nested Recovery Services */}
                  <details className="group/nested">
                    <summary className={mobileNestedSummary}>
                      Recovery Services
                      <ChevronDown className="h-3 w-3 transition-transform group-open/nested:rotate-180" />
                    </summary>
                    <div className="ml-4 mt-2 flex flex-col gap-2 border-l border-white/10 pl-4">
                      {recoveryServices.map(item => (
                        <MobileLink key={item.label} href={item.href}>
                          {item.label}
                        </MobileLink>
                      ))}
                    </div>
                  </details>

                  {otherRecoveryOptions.map(item => (
                    <MobileLink key={item.label} href={item.href}>
                      {item.label}
                    </MobileLink>
                  ))}
                </MobileGroup>
              </details>

              <MobileLink href="/pricing">Pricing</MobileLink>
              <MobileLink href="/blog">Blog</MobileLink>

              <Button className="mt-4 w-full bg-white text-black hover:bg-zinc-200">
                Recover Your Wallet
              </Button>

            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

/* ---------------- STYLES ---------------- */

const triggerStyle =
  'bg-transparent text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700'

const dropdownStyle =
  'bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/10 rounded-xl shadow-2xl'

const nestedTriggerStyle =
  'flex items-center justify-between rounded-lg p-3 cursor-pointer text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700'

const nestedMenuStyle =
  'absolute left-full top-0 ml-2 w-56 rounded-xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-black shadow-2xl p-2 z-50'

const nestedItemStyle =
  'block rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700'

const mobileSummary =
  'flex cursor-pointer items-center justify-between text-lg font-semibold text-white/80 hover:text-white list-none'

const mobileNestedSummary =
  'flex cursor-pointer items-center justify-between text-sm font-medium text-white/70 hover:text-white list-none'

/* ---------------- HELPERS ---------------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), triggerStyle)}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-white/80 hover:text-white transition-colors">
      {children}
    </Link>
  )
}

function MobileGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-4 mt-3 flex flex-col gap-3 border-l border-white/10 pl-4">
      {children}
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; href: string }
>(({ title, children, href }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className="
          block rounded-lg p-3
          text-white/80 hover:text-white
          hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700
          transition-colors
        "
      >
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm text-white/50">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
))
ListItem.displayName = 'ListItem'