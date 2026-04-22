'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { BookingContextType, BookingState, BookingStep } from '@/types'

const initialState: BookingState = {
  step: 1,
  selectedDate: null,
  selectedTime: null,
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  notes: '',
}

const BookingContext = createContext<BookingContextType>({} as BookingContextType)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState)

  const setSelectedDate = useCallback((date: Date | null) => {
    setState((prev) => ({ ...prev, selectedDate: date, selectedTime: null }))
  }, [])

  const setSelectedTime = useCallback((time: string | null) => {
    setState((prev) => ({ ...prev, selectedTime: time }))
  }, [])

  const setStep = useCallback((step: BookingStep) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const updateClientInfo = useCallback(
    (info: Partial<Pick<BookingState, 'clientName' | 'clientPhone' | 'clientEmail' | 'notes'>>) => {
      setState((prev) => ({ ...prev, ...info }))
    },
    [],
  )

  const resetBooking = useCallback(() => {
    setState(initialState)
  }, [])

  return (
    <BookingContext.Provider
      value={{ state, setSelectedDate, setSelectedTime, setStep, updateClientInfo, resetBooking }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
