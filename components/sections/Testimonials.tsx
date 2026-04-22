'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/mock-data'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="shrink-0 w-[340px] md:w-[380px] bg-card border border-border rounded-2xl p-6 mx-3">
      {/* Quote mark */}
      <span className="text-4xl font-serif text-muted-foreground/20 leading-none select-none">
        &ldquo;
      </span>

      <p className="text-sm text-muted-foreground leading-relaxed mt-1 mb-6 line-clamp-5">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {testimonial.name}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{testimonial.date}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <StarRating rating={testimonial.rating} />
          <span className="text-[10px] tracking-wide uppercase text-muted-foreground/60">
            {testimonial.style}
          </span>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Duplicate for seamless infinite loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="depoimentos" className="py-28 md:py-36 bg-background overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-14">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground font-medium mb-4">
            O que dizem
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.88] tracking-tight text-foreground">
            DEPOIMENTOS
          </h2>
        </motion.div>
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div
          className="flex animate-marquee"
          style={{ width: 'max-content' }}
          aria-label="Depoimentos de clientes"
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — right to left (reverse) */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div
          className="flex animate-marquee-reverse"
          style={{ width: 'max-content' }}
          aria-hidden="true"
        >
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`rev-${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Rating summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto px-5 md:px-10 mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
      >
        <div className="text-center">
          <p className="font-display font-black text-5xl text-foreground">5.0</p>
          <StarRating rating={5} />
          <p className="text-xs text-muted-foreground mt-2">Avaliação média</p>
        </div>
        <div className="hidden sm:block w-px h-12 bg-border" />
        <div className="text-center">
          <p className="font-display font-black text-5xl text-foreground">200+</p>
          <p className="text-xs text-muted-foreground mt-2">Clientes satisfeitos</p>
        </div>
        <div className="hidden sm:block w-px h-12 bg-border" />
        <div className="text-center">
          <p className="font-display font-black text-5xl text-foreground">100%</p>
          <p className="text-xs text-muted-foreground mt-2">Recomendariam</p>
        </div>
      </motion.div>
    </section>
  )
}
