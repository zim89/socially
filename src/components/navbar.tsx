import Link from 'next/link'
import { syncUser } from '@/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { NavbarDesktop } from './navbar-desktop'
import { NavbarMobile } from './navbar-mobile'

export async function Navbar() {
  const user = await currentUser()
  if (user) await syncUser()

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='font-mono text-xl font-bold tracking-wider text-primary'
            >
              Socially
            </Link>
          </div>

          <NavbarDesktop />
          <NavbarMobile />
        </div>
      </div>
    </nav>
  )
}
