import { NextResponse } from 'next/server'
import { clerkMiddleware } from '@clerk/nextjs/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default clerkMiddleware(async (auth, request) => {
  const response = NextResponse.next()

  response.headers.set(
    'Content-Security-Policy',
    [
      // Базовые правила
      "default-src 'self'",

      // Скрипты
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://*.sentry-cdn.com",

      // Стили
      "style-src 'self' 'unsafe-inline'",

      // Изображения и медиа - добавлен utfs.io
      "img-src 'self' data: blob: https://*.clerk.com https://*.uploadthing.com https://uploadthing.com https://utfs.io",

      // Подключения
      "connect-src 'self' https://*.clerk.accounts.dev https://api.clerk.dev https://*.clerk.com https://*.sentry.io https://*.ingest.sentry.io https://*.uploadthing.com https://uploadthing.com https://sea1.ingest.uploadthing.com",

      // Фреймы
      "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com",

      // Воркеры
      "worker-src 'self' blob:",

      // Дополнительные источники
      "script-src-elem 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.sentry-cdn.com https://*.uploadthing.com",
    ].join('; '),
  )

  return response
})

export const config = {
  matcher: [
    '/((?!_next/image|_next/static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
