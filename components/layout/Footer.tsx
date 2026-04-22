import { Instagram, MessageCircle } from 'lucide-react'
import { socialLinks } from '@/lib/mock-data'
import Link from 'next/link'

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
  </svg>
)

const footerLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#agendamento', label: 'Agendamento' },
  { href: '#contato', label: 'Contato' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="#inicio"
              className="font-display font-black text-xl tracking-tight text-foreground"
            >
              DUDA<span className="text-muted-foreground font-light">·</span>CAMPOS
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              Arte que dura para sempre. Cada traço é uma história,
              cada sessão é uma experiência única.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Navegação
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Contato
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span>Santa Rita, Mendes — RJ, Brasil</span>
              <a
                href={socialLinks.whatsapp}
                className="hover:text-foreground transition-colors"
              >
                (11) 9 9999-9999
              </a>
              <a
                href="mailto:contato@dudacampos.tattoo"
                className="hover:text-foreground transition-colors"
              >
                contato@dudacampos.tattoo
              </a>
              <span className="text-muted-foreground/60 text-xs mt-1">
                Seg – Sáb: 09h às 19h
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">
            © {year} Duda Campos Tattoo. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Arte impressa na pele, eternamente.
          </p>
        </div>
      </div>
    </footer>
  )
}
