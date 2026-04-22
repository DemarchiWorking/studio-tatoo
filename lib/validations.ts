import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(60, 'Nome muito longo'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Informe um email válido'),
  whatsapp: z
    .string()
    .min(10, 'WhatsApp inválido — informe DDD + número')
    .max(15, 'Número muito longo')
    .regex(/^[\d\s\-()+]+$/, 'Apenas números, espaços e traços'),
  idea: z
    .string()
    .min(20, 'Descreva sua ideia com pelo menos 20 caracteres')
    .max(1000, 'Máximo de 1000 caracteres'),
  reference: z.any().optional(),
})

export type ContactSchemaType = z.infer<typeof contactSchema>

export const bookingClientSchema = z.object({
  clientName: z.string().min(2, 'Nome obrigatório'),
  clientEmail: z.string().email('Email inválido'),
  clientPhone: z.string().min(10, 'WhatsApp inválido'),
  notes: z.string().max(500, 'Máximo 500 caracteres').optional(),
})

export type BookingClientSchemaType = z.infer<typeof bookingClientSchema>
