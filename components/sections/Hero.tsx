'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.25 },
  },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // text scrolls up faster than image → parallax depth
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textOp    = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const charY     = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const charOp    = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Base background ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#100d12]" />

      {/* Warm centre glow — behind the character */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_72%_100%,rgba(210,110,55,0.22)_0%,rgba(160,65,120,0.12)_45%,transparent_70%)]" />

      {/* Cool top-left accent */}
      <div className="absolute top-0 left-0 w-[50%] h-[45%] bg-[radial-gradient(ellipse_at_top_left,rgba(100,80,200,0.09)_0%,transparent_65%)]" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Film-grain noise */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Fine horizontal rule — upper third */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-[30%] left-0 right-0 h-px bg-white/[0.05]"
      />

      {/* ── Character — absolute, right-anchored, bottom-anchored ── */}
      <motion.div
        style={{ y: charY, opacity: charOp }}
        initial={{ opacity: 0, x: 60, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 lg:right-[4%] xl:right-[7%] z-10
                   flex items-end justify-center pointer-events-none"
      >
        {/* Glow disc — ground level */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2
                     w-[130%] h-[38%]
                     rounded-[50%] blur-3xl
                     bg-[radial-gradient(ellipse,rgba(215,105,45,0.45)_0%,rgba(160,55,160,0.25)_50%,transparent_75%)]"
        />

        {/* Floating wrapper */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Shadow beneath feet, breathes with float */}
          <motion.div
            animate={{ scaleX: [1, 0.84, 1], opacity: [0.38, 0.18, 0.38] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2
                       w-[60%] h-5 rounded-full bg-black/60 blur-xl"
          />

          <Image
            src="/duda-caricatura.png"
            alt="Duda Campos — Tattoo Artist"
            width={406}
            height={614}
            priority
            className="
              relative z-10
              w-auto
              h-[62vh] sm:h-[68vh] lg:h-[78vh] xl:h-[82vh]
              max-w-none
              object-contain object-bottom
              select-none
            "
          />
        </motion.div>
      </motion.div>

      {/* ── Text content — left side ─────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity: textOp }}
        variants={container}
        initial="hidden"
        animate="show"
        className="
          relative z-20
          flex flex-col items-start justify-center
          min-h-screen
          px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20
          pt-28 pb-24
          max-w-[580px] lg:max-w-[52%]
          select-none
        "
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-white/30" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-white/45 font-medium">
            Mendes · RJ · Brasil
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display font-black uppercase leading-[0.82] tracking-tight text-white"
          style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
        >
          DUDA
          <br />
          <span className="relative inline-block">
            {/* warm underline accent */}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-400">
              CAMPOS
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="absolute bottom-1 left-0 right-0 h-[3px] rounded-full
                         bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-500
                         opacity-70"
            />
          </span>
        </motion.h1>

        {/* Subtitle strip */}
        <motion.div variants={item} className="mt-8 mb-10 flex items-center gap-5">
          <div className="h-px w-14 bg-white/18" />
          <span className="text-[11px] tracking-[0.24em] uppercase text-white/45 font-medium whitespace-nowrap">
            Arte permanente na pele
          </span>
          <div className="h-px w-14 bg-white/18" />
        </motion.div>

        {/* CTA row */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-start gap-3">
          <Button href="#agendamento" size="lg">
            <Calendar className="w-4 h-4" />
            Agendar Sessão
          </Button>
          <Button href="#portfolio" variant="outline" size="lg">
            Ver Portfólio
            <ChevronDown className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-16 flex items-center gap-10"
        >
          {[
            { value: '80+', label: 'Tatuagens' },
            { value: '2+',   label: 'Anos' },
            { value: '100%', label: 'Exclusivas' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-start gap-10">
              {i > 0 && <div className="h-8 w-px bg-white/10 self-center" />}
              <div>
                <p className="font-display font-black text-2xl text-white leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-white/35 mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
