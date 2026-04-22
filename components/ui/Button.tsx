'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  loading?: boolean
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:  'bg-foreground text-background hover:bg-foreground/90',
  secondary:'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost:    'bg-transparent text-foreground hover:bg-muted',
  outline:  'border border-border text-foreground bg-transparent hover:bg-muted',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-12 px-8 text-sm gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', href, loading, className, children, disabled, ...props },
    ref,
  ) => {
    const classes = cn(
      'inline-flex items-center justify-center font-medium tracking-wide',
      'rounded-full transition-colors duration-200 outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      className,
    )

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    const isDisabled = disabled || loading

    return (
      <motion.span
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="inline-flex"
      >
        <button
          ref={ref}
          disabled={isDisabled}
          className={classes}
          {...props}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Enviando...
            </>
          ) : (
            children
          )}
        </button>
      </motion.span>
    )
  },
)

Button.displayName = 'Button'
