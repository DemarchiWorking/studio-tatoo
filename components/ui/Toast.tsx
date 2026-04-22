'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error'

interface ToastProps {
  visible: boolean
  type?: ToastType
  title: string
  description?: string
  onClose: () => void
}

export function Toast({ visible, type = 'success', title, description, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className={cn(
            'fixed bottom-6 right-6 z-[200] flex items-start gap-3',
            'max-w-sm w-full p-4 rounded-2xl shadow-2xl',
            'border border-border bg-card',
          )}
        >
          <span className="mt-0.5 shrink-0">
            {type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </span>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
