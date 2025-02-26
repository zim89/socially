import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Providers } from './providers'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Sidebar } from '@/components/sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Socially',
  description: 'A modern social media application powered by Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <div className='min-h-screen'>
              <Navbar />

              <main className='py-8'>
                <div className='mx-auto max-w-7xl px-4'>
                  <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
                    <div className='hidden lg:col-span-3 lg:block'>
                      <Sidebar />
                    </div>
                    <div className='lg:col-span-9'>{children}</div>
                  </div>
                </div>
              </main>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
