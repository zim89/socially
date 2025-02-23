import Link from 'next/link'
import { NavbarDesktop } from './navbar-desktop'
import { NavbarMobile } from './navbar-mobile'

export async function Navbar() {
  return (
    <nav className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-primary font-mono text-xl font-bold tracking-wider'
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
