import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/f/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              // Базовые правила
              "default-src 'self'",

              // Скрипты
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://*.sentry-cdn.com",

              // Стили
              "style-src 'self' 'unsafe-inline'",

              // Изображения
              "img-src 'self' data: blob: https://*.clerk.com",

              // Шрифты
              "font-src 'self'",

              // Подключения - добавлен домен Sentry
              "connect-src 'self' https://*.clerk.accounts.dev https://api.clerk.dev https://*.clerk.com https://*.sentry.io https://*.ingest.sentry.io",

              // Фреймы
              "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com",

              // Веб-воркеры
              "worker-src 'self' blob:",

              // Дополнительные источники
              "script-src-elem 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.sentry-cdn.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
