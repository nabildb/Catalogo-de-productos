import { Header } from '@/app/components/Header';
import { Link } from 'react-router-dom';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Contacto
          </p>
          <h1 className="text-3xl font-semibold">Hablemos</h1>
          <p className="text-sm text-slate-600">
            Completa el formulario y el equipo se pondrá en contacto contigo.
          </p>
        </div>

        <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
              placeholder="Tu nombre"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white"
          >
            Enviar mensaje
          </button>
        </form>

        <Link
          to="/products"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-sky-500"
        >
          Volver al catálogo
          <span aria-hidden>→</span>
        </Link>
      </main>
    </div>
  );
}
