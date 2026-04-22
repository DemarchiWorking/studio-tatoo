import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Portfolio } from '@/components/sections/Portfolio'
import { Booking } from '@/components/sections/Booking'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { BookingProvider } from '@/components/providers/BookingProvider'

export default function Home() {
  return (
    <BookingProvider>
      <Header />

      <main>
        <Hero />
        <Portfolio />

        {/* Divider */}
        <div className="h-px bg-border/50 max-w-7xl mx-auto" />

        <Booking />

        {/* Divider */}
        <div className="h-px bg-border/50 max-w-7xl mx-auto" />

        <Testimonials />

        {/* Divider */}
        <div className="h-px bg-border/50 max-w-7xl mx-auto" />

        <Contact />
      </main>

      <Footer />
    </BookingProvider>
  )
}
