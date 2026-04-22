import type { PortfolioItem, Testimonial, TimeSlot } from '@/types'

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    src: 'https://i.ibb.co/kgqqbdzm/IMG-1806.jpg',
    width: 600,
    height: 800,
    category: 'Minimalista',
    title: 'Borboleta',
    description: 'Olhos de Borboleta',
  },
  {
    id: '2',
    src: 'https://i.ibb.co/V0dwT4TK/IMG-1808.jpg',
    width: 600,
    height: 900,
    category: 'Minimalista',
    title: 'Passaro',
    description: 'Passaro celestial.',
  },
  {
    id: '3',
    src: 'https://i.ibb.co/B5s06vTt/IMG-1803.jpg',
    width: 600,
    height: 600,
    category: 'Minimalista',
    title: 'Flores',
    description: 'Flores animadas.',
  },
  {
    id: '4',
    src: 'https://i.ibb.co/1tybRSxR/IMG-1805.jpg',
    width: 600,
    height: 750,
    category: 'Minimalista',
    title: 'Coruja',
    description: 'Coruja noturna',
  },
  {
    id: '5',
    src: 'https://i.ibb.co/ycJ4vQxD/IMG-1801.jpg',
    width: 600,
    height: 850,
    category: 'Minimalista',
    title: 'Natureza',
    description: 'Natureza traços',
  },
  {
    id: '6',
    src: 'https://i.ibb.co/N2PRR8cq/cobra.webp',
    width: 600,
    height: 650,
    category: 'Minimalista',
    title: 'Cobra',
    description: 'Cobra.',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marina Costa',
    avatar: 'https://picsum.photos/seed/avatar-mc/80/80',
    rating: 5,
    text: 'Simplesmente incrível. A Duda entendeu exatamente o que eu queria — um realismo que parecesse pintura. Fui com uma referência vaga e ela transformou em arte pura. A atenção ao detalhe é absurda, cada sombra no lugar certo. Já indiquei para toda minha família.',
    style: 'Realismo',
    date: 'Março 2025',
  },
  {
    id: '2',
    name: 'Lucas Ferreira',
    avatar: 'https://picsum.photos/seed/avatar-lf/80/80',
    rating: 5,
    text: 'Fiz um blackwork de manga completa e ficou a obra de arte que eu sempre sonhei. O traço da Duda é único — linhas firmes, cobertura uniforme e uma composição que flui naturalmente com a anatomia do braço. Profissionalismo do início ao fim.',
    style: 'Blackwork',
    date: 'Fevereiro 2025',
  },
  {
    id: '3',
    name: 'Isabela Nogueira',
    avatar: 'https://picsum.photos/seed/avatar-in/80/80',
    rating: 5,
    text: 'Queria algo delicado e minimalista no pulso. A Duda trouxe sketches incríveis na consulta, respeitou meu estilo e o resultado superou minhas expectativas. A linha é tão fina que parece desenhada a lápis na pele. Studio impecável, espaço acolhedor.',
    style: 'Minimalista',
    date: 'Janeiro 2025',
  },
  {
    id: '4',
    name: 'Rafael Monteiro',
    avatar: 'https://picsum.photos/seed/avatar-rm/80/80',
    rating: 5,
    text: 'Minha tattoo oriental cobriu a costela inteira e foi a melhor decisão que tomei. A Duda domina a técnica oriental de um jeito que poucos artistas no Brasil dominam. A carpa koi ficou com profundidade de cor impressionante. Cicatrizou perfeitamente.',
    style: 'Oriental',
    date: 'Dezembro 2024',
  },
  {
    id: '5',
    name: 'Thais Albuquerque',
    avatar: 'https://picsum.photos/seed/avatar-ta/80/80',
    rating: 5,
    text: 'Era minha primeira tatuagem e estava com muito medo. A Duda me recebeu com calma, explicou cada etapa do processo e foi extremamente cuidadosa durante a sessão. O resultado geométrico no ombro ficou perfeito. Já marquei a segunda!',
    style: 'Geométrico',
    date: 'Novembro 2024',
  },
]

export const availableTimeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: false },
  { time: '11:00', available: true },
  { time: '12:00', available: false },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: false },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
  { time: '18:00', available: false },
]

export const tattooStyles = [
  'Todos',
  'Minimalista',
  'Realismo',
  'Blackwork',
  'Geométrico',
  'Oriental',
] as const

export const socialLinks = {
  instagram: 'https://instagram.com/dudacampostattoo',
  whatsapp: 'https://wa.me/5511999999999',
  tiktok: 'https://tiktok.com/@dudacampostattoo',
}
