import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistPixelGrid } from 'geist/font/pixel'
import { ThemeProvider } from '@/components/theme-provider'
import { ChatProvider } from '@/contexts/chat-context'
import { FloatingChatButton } from '@/components/floating-chat-button'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Philip Titus | Software & ML Engineer | Full-Stack Developer',
  description:
    'Software Engineer & ML Specialist. Building scalable systems, intelligent models, and exceptional digital experiences. 5+ years of expertise in full-stack development, cloud architecture, DevOps, and machine learning.',
  keywords: [
    'Software Engineer',
    'ML Engineer',
    'DevOps',
    'Full-Stack Developer',
    'Python',
    'JavaScript',
    'React',
    'AWS',
    'Google Cloud',
    'Machine Learning',
    'Cloud Architecture',
    'System Design',
    'Portfolio',
    'Software Developer',
    'Backend Engineer',
    'Frontend Developer',
    'AI Integration',
  ],
  authors: [{ name: 'Philip Titus' }],
  creator: 'Philip Titus',
  publisher: 'Philip Titus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Philip Titus | Software & ML Engineer',
    description:
      'Full-stack developer with expertise in cloud architecture, machine learning, and DevOps. 5+ years of experience building scalable systems.',
    siteName: 'Philip Titus Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philip Titus | Software & ML Engineer',
    description:
      'Software engineer & ML specialist. Building intelligent systems and scalable infrastructure.',
    creator: '@philiptitus',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#F2F1EA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${GeistPixelGrid.variable}`} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <ChatProvider>
            {children}
            <FloatingChatButton />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
