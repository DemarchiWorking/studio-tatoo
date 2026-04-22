'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, Send, Instagram, MessageCircle, MapPin, Clock } from 'lucide-react'
import { contactSchema, type ContactSchemaType } from '@/lib/validations'
import { socialLinks } from '@/lib/mock-data'
import { sleep, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fileName, setFileName] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
  })

  const ideaValue = watch('idea', '')

  // TODO: [Backend Integration] — replace this with a real API call:
  //   await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  //   Or trigger a webhook:
  //   await fetch(process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL!, { method: 'POST', ... })
  //   Or integrate with a CRM/email service (e.g. Brevo, Resend, Mailchimp):
  //   await sendEmail({ to: 'contato@dudacampos.tattoo', ...data })
  const onSubmit = async (data: ContactSchemaType) => {
    console.log('[Contact] Form data (mock):', data)
    setSubmitState('loading')
    await sleep(2000)
    setSubmitState('success')
    reset()
    setFileName(null)
  }

  return (
    <section id="contato" className="py-28 md:py-36 bg-card">
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
            Vamos conversar
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.88] tracking-tight text-foreground">
            CONTATO
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ContactField label="Nome" error={errors.name?.message}>
                  <input
                    {...register('name')}
                    placeholder="Seu nome completo"
                    className={inputCls(!!errors.name)}
                  />
                </ContactField>

                <ContactField label="Email" error={errors.email?.message}>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="seu@email.com"
                    className={inputCls(!!errors.email)}
                  />
                </ContactField>
              </div>

              <ContactField label="WhatsApp" error={errors.whatsapp?.message}>
                <input
                  {...register('whatsapp')}
                  placeholder="(11) 9 9999-9999"
                  className={inputCls(!!errors.whatsapp)}
                />
              </ContactField>

              <ContactField
                label={`Ideia da Tatuagem (${ideaValue.length}/1000)`}
                error={errors.idea?.message}
              >
                <textarea
                  {...register('idea')}
                  rows={5}
                  placeholder="Descreva sua ideia: estilo, tamanho, posição no corpo, referências visuais que te inspiram…"
                  className={cn(inputCls(!!errors.idea), 'resize-none')}
                />
              </ContactField>

              {/* File upload — visually mocked */}
              <ContactField
                label="Referência Visual (opcional)"
                error={undefined}
              >
                <label
                  htmlFor="reference-upload"
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 py-8 px-6',
                    'rounded-xl border-2 border-dashed border-border',
                    'cursor-pointer transition-colors hover:border-muted-foreground/50 hover:bg-muted/40',
                    'text-muted-foreground text-sm',
                  )}
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-center leading-relaxed">
                    {fileName ? (
                      <span className="text-foreground font-medium">{fileName}</span>
                    ) : (
                      <>
                        <span className="font-medium text-foreground">
                          Clique para enviar
                        </span>{' '}
                        ou arraste e solte
                        <br />
                        <span className="text-xs text-muted-foreground/60">
                          PNG, JPG, WEBP até 10MB
                        </span>
                      </>
                    )}
                  </span>
                  <input
                    id="reference-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    {...register('reference')}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      setFileName(file ? file.name : null)
                    }}
                  />
                </label>
              </ContactField>

              <Button
                type="submit"
                size="lg"
                loading={submitState === 'loading'}
                className="w-full sm:w-auto"
              >
                <Send className="w-4 h-4" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>

          {/* Info sidebar — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact info */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Informações
              </h3>

              <InfoRow icon={<MapPin className="w-4 h-4" />} label="Localização">
                Santa Rita, Mendes — RJ, Brasil
                <br />
                <span className="text-muted-foreground/60 text-xs">
                  Endereço exato enviado após confirmação
                </span>
              </InfoRow>

              <InfoRow icon={<Clock className="w-4 h-4" />} label="Horário">
                Segunda a Sábado
                <br />
                <span className="text-muted-foreground/60 text-xs">09h às 19h</span>
              </InfoRow>

              <InfoRow icon={<MessageCircle className="w-4 h-4" />} label="WhatsApp">
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  (11) 9 9999-9999
                </a>
              </InfoRow>
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Redes Sociais
              </h3>
              <div className="flex flex-col gap-3">
                <SocialLink
                  href={socialLinks.instagram}
                  icon={<Instagram className="w-4 h-4" />}
                  label="@dudacampostattoo"
                  platform="Instagram"
                />
                <SocialLink
                  href={socialLinks.whatsapp}
                  icon={<MessageCircle className="w-4 h-4" />}
                  label="Chat direto"
                  platform="WhatsApp"
                />
                <SocialLink
                  href={socialLinks.tiktok}
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
                    </svg>
                  }
                  label="@dudacampostattoo"
                  platform="TikTok"
                />
              </div>
            </div>

            {/* CTA card */}
            <div className="p-6 rounded-2xl bg-foreground/5 border border-border">
              <p className="text-sm font-semibold text-foreground mb-2">
                Resposta em até 24 horas
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Após receber sua mensagem, entrarei em contato para discutir sua ideia,
                confirmar disponibilidade e enviar o orçamento.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast
        visible={submitState === 'success'}
        type="success"
        title="Mensagem enviada!"
        description="Em breve retornarei seu contato pelo WhatsApp ou email."
        onClose={() => setSubmitState('idle')}
      />
    </section>
  )
}

function ContactField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-muted-foreground shrink-0">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground/60 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function SocialLink({
  href,
  icon,
  label,
  platform,
}: {
  href: string
  icon: React.ReactNode
  label: string
  platform: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-secondary transition-colors group"
    >
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium text-foreground">{platform}</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>
    </a>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200',
    'placeholder:text-muted-foreground/40 text-foreground outline-none',
    'focus:border-foreground/40 focus:ring-1 focus:ring-foreground/15',
    hasError ? 'border-red-400/60 focus:border-red-400/60 focus:ring-red-400/10' : 'border-border',
  )
}
