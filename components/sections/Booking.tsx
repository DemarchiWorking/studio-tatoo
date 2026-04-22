'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { isBefore, startOfToday, isSunday } from 'date-fns'
import { CheckCircle2, Clock, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBooking } from '@/components/providers/BookingProvider'
import { availableTimeSlots } from '@/lib/mock-data'
import { bookingClientSchema, type BookingClientSchemaType } from '@/lib/validations'
import { formatDatePT, cn, sleep } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

// Simulate some booked dates for demo
const mockUnavailableDates = [
  new Date(2025, 7, 12),
  new Date(2025, 7, 18),
  new Date(2025, 7, 25),
]

const dayPickerClassNames = {
  root: 'w-full',
  months: 'flex flex-col sm:flex-row gap-6',
  month: 'w-full',
  caption: 'flex justify-center py-2 mb-3 relative items-center',
  caption_label: 'text-sm font-semibold text-foreground capitalize',
  nav: 'flex items-center justify-between absolute inset-x-0 top-0',
  nav_button:
    'h-8 w-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors',
  nav_button_previous: 'absolute left-0',
  nav_button_next: 'absolute right-0',
  table: 'w-full border-collapse',
  head_row: 'grid grid-cols-7',
  head_cell:
    'text-[10px] font-medium uppercase tracking-widest text-muted-foreground text-center py-2',
  row: 'grid grid-cols-7 mt-1',
  cell: 'p-0 text-center text-sm',
  day: 'h-9 w-full rounded-lg flex items-center justify-center text-[13px] font-medium hover:bg-muted transition-colors cursor-pointer text-foreground',
  day_selected:
    'bg-foreground !text-background hover:bg-foreground/90 font-semibold',
  day_today:
    'border border-border font-semibold text-foreground',
  day_disabled:
    'text-muted-foreground/30 cursor-not-allowed hover:bg-transparent line-through',
  day_outside: 'text-muted-foreground/25 cursor-not-allowed hover:bg-transparent',
  day_range_middle: '',
  day_hidden: 'invisible',
}

export function Booking() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { state, setSelectedDate, setSelectedTime, setStep, updateClientInfo, resetBooking } =
    useBooking()
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingClientSchemaType>({
    resolver: zodResolver(bookingClientSchema),
  })

  const isDateDisabled = (date: Date) => {
    const today = startOfToday()
    return (
      isBefore(date, today) ||
      isSunday(date) ||
      mockUnavailableDates.some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate(),
      )
    )
  }

  // TODO: [Backend Integration] — submit booking data to POST /api/bookings
  // Replace mock delay with real API call and handle errors gracefully
  const onSubmitClient = async (data: BookingClientSchemaType) => {
    setSubmitting(true)
    updateClientInfo(data)
    await sleep(1600)
    setSubmitting(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <section id="agendamento" className="py-28 md:py-36 bg-card">
        <div className="max-w-lg mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="font-display font-black text-3xl uppercase text-foreground">
              Sessão Confirmada!
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seu agendamento foi registrado.{' '}
              {state.selectedDate && (
                <strong className="text-foreground">{formatDatePT(state.selectedDate)}</strong>
              )}{' '}
              às{' '}
              <strong className="text-foreground">{state.selectedTime}</strong>.
              <br />
              Em breve você receberá uma confirmação por WhatsApp.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                resetBooking()
                setConfirmed(false)
                reset()
              }}
            >
              Fazer novo agendamento
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendamento" className="py-28 md:py-36 bg-card">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground font-medium mb-4">
            Reserve sua data
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.88] tracking-tight text-foreground">
            AGENDAMENTO
          </h2>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {([1, 2] as const).map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  state.step >= s
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {s}
              </div>
              <span
                className={cn(
                  'text-xs font-medium transition-colors hidden sm:block',
                  state.step >= s ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {s === 1 ? 'Data & Horário' : 'Seus Dados'}
              </span>
              {s < 2 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1: Date & Time */}
        {state.step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Calendar */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Escolha a data</h3>
              </div>

              {/* react-day-picker styles injected via classNames prop */}
              <DayPicker
                mode="single"
                selected={state.selectedDate ?? undefined}
                onSelect={(d) => setSelectedDate(d ?? null)}
                locale={ptBR}
                disabled={isDateDisabled}
                classNames={dayPickerClassNames}
                components={{
                  IconLeft: () => <ChevronLeft className="w-4 h-4" />,
                  IconRight: () => <ChevronRight className="w-4 h-4" />,
                }}
              />

              <p className="text-[11px] text-muted-foreground/60 mt-4">
                * Domingos indisponíveis. Horários riscados já reservados.
              </p>
            </div>

            {/* Time slots */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">
                  {state.selectedDate ? 'Escolha o horário' : 'Selecione uma data primeiro'}
                </h3>
              </div>

              {state.selectedDate ? (
                <div className="grid grid-cols-2 gap-3">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={cn(
                        'py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200',
                        'flex items-center justify-between',
                        slot.available
                          ? state.selectedTime === slot.time
                            ? 'bg-foreground text-background'
                            : 'bg-muted text-foreground hover:bg-secondary'
                          : 'bg-muted/40 text-muted-foreground/30 cursor-not-allowed line-through',
                      )}
                    >
                      {slot.time}
                      {slot.available ? (
                        <span className="text-[10px] tracking-wide uppercase text-muted-foreground">
                          {state.selectedTime === slot.time ? '✓' : 'livre'}
                        </span>
                      ) : (
                        <span className="text-[10px]">ocupado</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground/40">
                  <Clock className="w-8 h-8 mb-3" />
                  <p className="text-sm">Aguardando data…</p>
                </div>
              )}

              {/* Selection summary */}
              {state.selectedDate && state.selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-muted border border-border"
                >
                  <p className="text-xs text-muted-foreground mb-1">Sessão selecionada</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDatePT(state.selectedDate)} · {state.selectedTime}
                  </p>
                </motion.div>
              )}

              <Button
                className="w-full mt-6"
                disabled={!state.selectedDate || !state.selectedTime}
                onClick={() => setStep(2)}
              >
                Continuar
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Client info */}
        {state.step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl"
          >
            <div className="bg-background rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Seus dados</h3>
              </div>

              {/* Summary */}
              {state.selectedDate && state.selectedTime && (
                <div className="mb-6 p-4 rounded-xl bg-muted text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {formatDatePT(state.selectedDate)}
                  </span>{' '}
                  às{' '}
                  <span className="font-medium text-foreground">{state.selectedTime}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmitClient)} className="space-y-5">
                <Field label="Nome completo" error={errors.clientName?.message}>
                  <input
                    {...register('clientName')}
                    placeholder="Seu nome"
                    className={inputClass(!!errors.clientName)}
                  />
                </Field>

                <Field label="Email" error={errors.clientEmail?.message}>
                  <input
                    {...register('clientEmail')}
                    type="email"
                    placeholder="seu@email.com"
                    className={inputClass(!!errors.clientEmail)}
                  />
                </Field>

                <Field label="WhatsApp" error={errors.clientPhone?.message}>
                  <input
                    {...register('clientPhone')}
                    placeholder="(11) 9 9999-9999"
                    className={inputClass(!!errors.clientPhone)}
                  />
                </Field>

                <Field label="Observações (opcional)" error={errors.notes?.message}>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder="Conte um pouco sobre a ideia da tatuagem…"
                    className={cn(inputClass(!!errors.notes), 'resize-none')}
                  />
                </Field>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button type="submit" loading={submitting} className="flex-1">
                    Confirmar Sessão
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-4 py-3 rounded-xl text-sm bg-muted border transition-colors duration-200',
    'placeholder:text-muted-foreground/50 text-foreground outline-none',
    'focus:border-foreground/50 focus:ring-1 focus:ring-foreground/20',
    hasError ? 'border-red-400/60' : 'border-border',
  )
}
