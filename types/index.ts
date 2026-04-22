export type PortfolioCategory =
  | 'Todos'
  | 'Minimalista'
  | 'Realismo'
  | 'Blackwork'
  | 'Geométrico'
  | 'Oriental'

export interface PortfolioItem {
  id: string
  src: string
  width: number
  height: number
  category: Exclude<PortfolioCategory, 'Todos'>
  title: string
  description: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  style: string
  date: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export type BookingStep = 1 | 2 | 3

export interface BookingState {
  step: BookingStep
  selectedDate: Date | null
  selectedTime: string | null
  clientName: string
  clientPhone: string
  clientEmail: string
  notes: string
}

export interface BookingContextType {
  state: BookingState
  setSelectedDate: (date: Date | null) => void
  setSelectedTime: (time: string | null) => void
  setStep: (step: BookingStep) => void
  updateClientInfo: (info: Partial<Pick<BookingState, 'clientName' | 'clientPhone' | 'clientEmail' | 'notes'>>) => void
  resetBooking: () => void
}

export interface ContactFormData {
  name: string
  email: string
  whatsapp: string
  idea: string
  reference?: FileList
}
