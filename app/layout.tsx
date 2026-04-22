import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Duda Campos — Tattoo Artist | Mendes, RJ',
  description:
    'Tatuagens autorais de alto nível. Especialista em Blackwork, Realismo, Minimalista, Geométrico e Oriental. Agende sua sessão em Mendes, RJ.',
  keywords: [
    'tatuagem',
    'tattoo',
    'tatuador',
    'Mendes RJ',
    'Santa Rita',
    'blackwork',
    'realismo',
    'minimalista',
    'Duda Campos',
  ],
  authors: [{ name: 'Duda Campos' }],
  openGraph: {
    title: 'Duda Campos — Tattoo Artist',
    description: 'Tatuagens autorais de alto nível em Mendes, RJ.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
