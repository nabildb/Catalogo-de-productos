// Página de contacto: muestra información, formulario y FAQ.
// VISUAL: header offset fijo, hero dark AURA, iconos con orb gradient, focus rings AURA, stagger FAQ cards.
import { useEffect, useRef, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare, Globe } from 'lucide-react';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const contactItems = [
  { icon: Mail, title: 'Email', value: 'info@aura.com', desc: 'Soporte 24/7' },
  { icon: Phone, title: 'Teléfono', value: '+34 676 76 67 67', desc: 'Lun-Vie 9:00-18:00' },
  { icon: MapPin, title: 'Oficina', value: 'Calle Rosa, Melano 69', desc: 'España' },
  { icon: Globe, title: 'Global', value: 'aura-tech.com', desc: 'Presencia internacional' },
];

export function ContactPage() {
  const form = useInView(0.1);
  const faqRef = useInView(0.1);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-40 pb-28 text-white">
        {/* Blobs AURA */}
        <div aria-hidden className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#00d4ff]/15 blur-[100px] pointer-events-none" />
        <div aria-hidden className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#a855f7]/15 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 text-center aura-fade-in-up">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00D4FF]">Contacto</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Hablemos de tu próximo{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] bg-clip-text text-transparent">
              proyecto
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 leading-relaxed">
            Estamos aquí para ayudarte. Ya sea una duda técnica, consulta comercial o simplemente quieres
            decir hola — estamos a un mensaje de distancia.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div ref={form.ref} className="grid gap-16 lg:grid-cols-2">

          {/* ─── Col izquierda: info ──────────────────────────────── */}
          <div className="space-y-10">
            <div className={[
              'transition-all duration-500',
              form.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
            ].join(' ')}>
              <h2 className="text-2xl font-bold text-slate-900">Información de contacto</h2>
              <p className="mt-3 text-slate-500 leading-relaxed">
                Nuestro equipo está disponible para resolver cualquier inquietud que puedas tener.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {contactItems.map(({ icon: Icon, title, value, desc }, i) => (
                <div
                  key={title}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={[
                    'group flex gap-4 transition-all duration-500',
                    form.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                  ].join(' ')}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl
                                  bg-gradient-to-br from-[#00D4FF]/10 to-[#A855F7]/10
                                  group-hover:from-[#00D4FF]/20 group-hover:to-[#A855F7]/20
                                  text-[#5B9FE3] transition-colors duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
                    <p className="mt-0.5 text-sm text-slate-700 font-medium">{value}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empresa card */}
            <div className={[
              'rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 border border-slate-100',
              'relative overflow-hidden group transition-all duration-500 delay-300',
              form.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}>
              <div aria-hidden className="absolute right-0 top-0 opacity-5 transition-transform duration-500 group-hover:scale-110">
                <MessageSquare className="h-40 w-40" />
              </div>
              <h3 className="text-base font-bold text-slate-900">¿Eres una empresa?</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Ofrecemos planes personalizados y descuentos por volumen para empresas y distribuidores.
                Consúltanos por nuestra sección B2B.
              </p>
              <button className="mt-5 text-sm font-bold text-[#5B9FE3] hover:text-[#A855F7]
                                 transition-colors duration-200 flex items-center gap-1.5 group">
                Saber más
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* ─── Col derecha: formulario ──────────────────────────── */}
          <div
            className={[
              'relative transition-all duration-500 delay-150',
              form.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
            ].join(' ')}
          >
            {/* Glow de fondo */}
            <div aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#A855F7]/10 rounded-[3rem] blur-xl scale-[1.05]" />

            <form className="relative space-y-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[var(--shadow-card-hover)]">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="first_name">Nombre</label>
                  <input
                    id="first_name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm
                               focus:border-[#5B9FE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B9FE3]/20
                               transition-all duration-200"
                    placeholder="Ej. Juan"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="last_name">Apellido</label>
                  <input
                    id="last_name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm
                               focus:border-[#5B9FE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B9FE3]/20
                               transition-all duration-200"
                    placeholder="Ej. Torne"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm
                             focus:border-[#5B9FE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B9FE3]/20
                             transition-all duration-200"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm resize-none
                             focus:border-[#5B9FE3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B9FE3]/20
                             transition-all duration-200"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#5B9FE3]"
                />
                <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                  Acepto la{' '}
                  <a href="#" className="text-[#5B9FE3] underline hover:text-[#A855F7] transition-colors">Política de Privacidad</a>
                  {' '}y los{' '}
                  <a href="#" className="text-[#5B9FE3] underline hover:text-[#A855F7] transition-colors">Términos de Servicio</a>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7]
                           py-3.5 text-sm font-bold text-white
                           hover:scale-[1.02] hover:shadow-[var(--shadow-glow-blue)]
                           active:scale-[0.98] transition-all duration-200"
              >
                Enviar mi mensaje
              </button>
            </form>
          </div>
        </div>

        {/* ─── FAQ ─────────────────────────────────────────────────── */}
        <section className="mt-28 pt-20 border-t border-slate-100">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5B9FE3]">FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Preguntas Frecuentes</h2>
            <p className="mt-3 text-slate-500">Resuelve tus dudas en segundos.</p>
          </div>

          <div ref={faqRef.ref} className="grid gap-6 md:grid-cols-3">
            {[
              { q: '¿Cuál es el tiempo de entrega?', a: 'Los pedidos se entregan en 24-48h laborables en la península.' },
              { q: '¿Puedo devolver un producto?', a: 'Tienes 30 días naturales para devoluciones de forma gratuita.' },
              { q: '¿Ofrecen garantía oficial?', a: 'Todos los productos cuentan con 3 años de garantía oficial.' },
            ].map(({ q, a }, i) => (
              <div
                key={q}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={[
                  'rounded-2xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)]',
                  'hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1',
                  'transition-all duration-400',
                  faqRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                ].join(' ')}
              >
                {/* Línea de acento */}
                <div className="mb-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7]" />
                <h4 className="font-bold text-slate-900 leading-snug">{q}</h4>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/products"
              className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#5B9FE3] transition-colors duration-200"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Volver al catálogo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
