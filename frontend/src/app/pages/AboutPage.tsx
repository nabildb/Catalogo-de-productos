// Página "Acerca de": misión, equipo y valores de la empresa.
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="bg-gradient-to-r from-[#00d4ff] via-[#5b9fe3] to-[#a855f7] py-20">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider opacity-90">Acerca de AURA</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">Una vitrina digital para productos curados</h1>
            <p className="mt-4 text-lg opacity-90">Diseñamos experiencias limpias para mostrar productos con datos en tiempo real.</p>
            <div className="mt-6 flex gap-3">
              <a href="/catalog" className="inline-flex items-center rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-[#0f172a] shadow hover:bg-white">Explorar catálogo</a>
              <a href="/contact" className="inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10">Contáctanos</a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <svg width="360" height="240" viewBox="0 0 360 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="12" y="36" width="120" height="160" rx="12" fill="white" fillOpacity="0.08" />
              <rect x="132" y="16" width="120" height="180" rx="12" fill="white" fillOpacity="0.12" />
              <rect x="252" y="56" width="80" height="120" rx="10" fill="white" fillOpacity="0.16" />
              <g fill="white" fillOpacity="0.95">
                <circle cx="72" cy="84" r="6" />
                <rect x="48" y="110" width="48" height="8" rx="3" />
                <rect x="48" y="130" width="72" height="10" rx="4" />
                <rect x="150" y="46" width="72" height="10" rx="4" />
                <rect x="150" y="70" width="92" height="12" rx="5" />
                <rect x="270" y="86" width="40" height="10" rx="4" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Selección curada</h3>
              <p className="mt-2 text-sm text-slate-600">Mostramos solo productos seleccionados para destacar calidad y estilo.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Datos en tiempo real</h3>
              <p className="mt-2 text-sm text-slate-600">Listados y disponibilidad sincronizados con Supabase para mantener el catálogo actualizado.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Fácil de usar</h3>
              <p className="mt-2 text-sm text-slate-600">Interfaz limpia, accesible y pensada para convertir visitantes en clientes.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Nuestra misión</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Conectar productos con personas</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">AURA nació para facilitar la presentación de productos seleccionados, ofreciendo una experiencia visual coherente y datos confiables. Pensamos en la simplicidad del editor y en la velocidad para el usuario final.</p>
          </div>

          <div className="flex justify-center">
            <a href="/contact" className="inline-flex items-center rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-95">Hablemos — Me interesa</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
