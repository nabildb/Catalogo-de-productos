import { Header } from '@/app/components/Header';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Nuestra historia
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Acerca de AURA</h1>
          <p className="text-sm leading-relaxed text-slate-600">
            AURA es una vitrina digital para productos curados. Este espacio está
            listo para conectarse con Supabase y mostrar catálogos en tiempo real.
          </p>
        </div>
      </main>
    </div>
  );
}
