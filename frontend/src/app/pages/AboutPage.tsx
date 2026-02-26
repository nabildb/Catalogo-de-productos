// Página "Acerca de": misión, equipo y valores de la empresa.
// VISUAL: header fijo offset, hero atmosférico AURA, cards con IntersectionObserver stagger, CTA premium.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

/* Hook reutilizable de visibilidad en viewport */
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

export function AboutPage() {
  const heroContent = useInView(0.1);
  const cards = useInView(0.1);
  const mission = useInView(0.15);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-28">
        {/* Fondo gradiente AURA */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] via-[#5B9FE3] to-[#A855F7]" />
        {/* Blob decorativo */}
        <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div
          ref={heroContent.ref}
          className="relative mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Texto */}
          <div
            className={[
              'md:w-1/2 text-white transition-all duration-700',
              heroContent.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
            ].join(' ')}
          >
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/70">Acerca de AURA</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Una vitrina digital para productos curados
            </h1>
            <p className="mt-4 text-lg text-white/85 leading-relaxed">
              Diseñamos experiencias limpias para mostrar productos con datos en tiempo real.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0f172a]
                           hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-200"
              >
                Explorar catálogo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white
                           hover:bg-white/15 hover:border-white active:scale-95 transition-all duration-200"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Ilustración decorativa con blobs flotantes */}
          <div
            className={[
              'md:w-1/2 flex justify-center transition-all duration-700 delay-150',
              heroContent.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
            ].join(' ')}
          >
            {/* Cards decorativas apiladas */}
            <div className="relative w-72 h-52">
              <div className="absolute left-0 bottom-0 h-36 w-28 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm" />
              <div className="absolute left-20 -top-2 h-44 w-32 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm" />
              <div className="absolute right-0 bottom-4 h-28 w-24 rounded-2xl bg-white/20 border border-white/25 backdrop-blur-sm" />
              {/* Detalles UI ficticios */}
              <div className="absolute left-24 top-8 flex flex-col gap-2 z-10">
                <div className="h-2.5 w-20 rounded-full bg-white/60" />
                <div className="h-2 w-14 rounded-full bg-white/40" />
                <div className="mt-2 h-2 w-24 rounded-full bg-white/40" />
                <div className="h-2 w-16 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        {/* ─── CARDS DE VALORES ────────────────────────────────────── */}
        <div ref={cards.ref} className="grid gap-6 md:grid-cols-3 mb-10">
          {[
            {
              icon: '✦',
              title: 'Selección curada',
              desc: 'Mostramos solo productos seleccionados para destacar calidad y estilo.',
              delay: '0ms',
            },
            {
              icon: '⚡',
              title: 'Datos en tiempo real',
              desc: 'Listados sincronizados con Supabase para mantener el catálogo siempre actualizado.',
              delay: '120ms',
            },
            {
              icon: '◎',
              title: 'Fácil de usar',
              desc: 'Interfaz limpia, accesible y pensada para convertir visitantes en clientes.',
              delay: '240ms',
            },
          ].map(({ icon, title, desc, delay }) => (
            <div
              key={title}
              style={{ transitionDelay: delay }}
              className={[
                'group rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)]',
                'hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1',
                'transition-all duration-400',
                cards.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              ].join(' ')}
            >
              {/* Icono con fondo gradient */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl
                              bg-gradient-to-br from-[#00D4FF]/20 to-[#A855F7]/20 text-lg
                              group-hover:from-[#00D4FF]/30 group-hover:to-[#A855F7]/30 transition-colors duration-200">
                {icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ─── MISIÓN ─────────────────────────────────────────────── */}
        <div
          ref={mission.ref}
          className={[
            'rounded-2xl border border-slate-100 bg-white p-8 mb-10',
            'shadow-[var(--shadow-card)] transition-all duration-600',
            mission.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          {/* Barra decorativa de color */}
          <div className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Nuestra misión</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">Conectar productos con personas</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            AURA nació para facilitar la presentación de productos seleccionados, ofreciendo una experiencia
            visual coherente y datos confiables. Pensamos en la simplicidad del editor y en la velocidad
            para el usuario final.
          </p>
        </div>

        {/* ─── CTA ────────────────────────────────────────────────── */}
        <div className={[
          'flex justify-center transition-all duration-600 delay-200',
          mission.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full
                       bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7]
                       px-8 py-3.5 text-sm font-bold text-white
                       hover:scale-105 hover:shadow-[var(--shadow-glow-blue)]
                       active:scale-95 transition-all duration-200"
          >
            Hablemos — Me interesa
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
