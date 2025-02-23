'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs'
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeSwitcher } from './theme-switcher'

export function NavbarMobile() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <div className='flex items-center space-x-2 md:hidden'>
      <ThemeSwitcher />

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <MenuIcon className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='w-[300px]'>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className='mt-6 flex flex-col space-y-4'>
            <Button
              variant='ghost'
              className='flex items-center justify-start gap-3'
              asChild
            >
              <Link href='/'>
                <HomeIcon className='h-4 w-4' />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant='ghost'
                  className='flex items-center justify-start gap-3'
                  asChild
                >
                  <Link href='/notifications'>
                    <BellIcon className='h-4 w-4' />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant='ghost'
                  className='flex items-center justify-start gap-3'
                  asChild
                >
                  <Link href='/profile'>
                    <UserIcon className='h-4 w-4' />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant='ghost'
                    className='flex w-full items-center justify-start gap-3'
                  >
                    <LogOutIcon className='h-4 w-4' />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode='modal'>
                <Button variant='default' className='w-full'>
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
