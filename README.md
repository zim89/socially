# Socially - Modern Social Network Platform

A full-featured social network built with Next.js 14 and modern web technologies.

<div align="center">
  <h3>Preview Image Here</h3>
</div>

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Authentication**: Clerk
- **Database**: Prisma + Neon
- **File Upload**: Uploadthing

## Features

- ⚡ Modern and fast Next.js application
- 🔒 Authentication with multiple providers
- 📝 Create, edit, and delete posts
- 🖼️ Image upload and optimization
- ❤️ Like and comment system
- 👤 User profiles
- 🌓 Dark/Light mode
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Neon database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/socially.git
cd socially
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

````env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# Uploadthing
UPLOADTHING_TOKEN=
```

4. Initialize database:

```bash
npx prisma generate
npx prisma db push
````

5. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.dev)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Neon](https://neon.tech/)
