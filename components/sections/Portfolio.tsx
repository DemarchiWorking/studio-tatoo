'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import { portfolioItems, tattooStyles } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { PortfolioCategory } from '@/types'
import { useRef } from 'react'

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('Todos')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const filtered =
    activeFilter === 'Todos'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <section id="portfolio" className="py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground font-medium mb-4">
            Trabalhos Selecionados
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.88] tracking-tight text-foreground">
            PORTFÓLIO
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {tattooStyles.map((style) => (
            <button
              key={style}
              onClick={() => setActiveFilter(style as PortfolioCategory)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200',
                activeFilter === style
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              {style}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-card cursor-pointer"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-400 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Card caption */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] tracking-wide uppercase text-muted-foreground/70 bg-muted px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-20 text-sm"
          >
            Nenhuma tatuagem encontrada para este estilo.
          </motion.p>
        )}
      </div>
    </section>
  )
}
