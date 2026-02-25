// Página de contacto: muestra información, formulario y FAQ.
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare, Globe } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-900 to-slate-900"></div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-sky-400">Contacto</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">Hablemos de tu próximo proyecto</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Estamos aquí para ayudarte. Ya sea una duda técnica, una consulta comercial o simplemente quieres decir hola, estamos a un mensaje de distancia.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Información de contacto</h2>
              <p className="mt-4 text-slate-600">
                Nuestro equipo de atención al cliente está disponible para resolver cualquier inquietud que puedas tener.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {[
                { icon: Mail, title: 'Email', value: 'info@aura.com', desc: 'Soporte 24/7' },
                { icon: Phone, title: 'Teléfono', value: '+34 676 76 67 67', desc: 'Lun-Vie 9:00 - 18:00' },
                { icon: MapPin, title: 'Oficina', value: 'Calle Rosa, Melano 69', desc: 'España' },
                { icon: Globe, title: 'Global', value: 'aura-tech.com', desc: 'Presencia internacional' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-950 font-medium">{item.value}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100 relative overflow-hidden group">
              <div className="absolute right-0 top-0 opacity-5 transition-transform duration-500 group-hover:scale-110">
                <MessageSquare className="h-40 w-40" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">¿Eres una empresa?</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Ofrecemos planes personalizados y descuentos por volumen para empresas y distribuidores. Consúltanos por nuestra sección B2B.
              </p>
              <button className="mt-6 text-sm font-bold text-sky-600 hover:text-sky-700 transition flex items-center gap-2">
                Saber más <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-sky-100 rounded-[3rem] -rotate-1 scale-[1.02] opacity-50 blur-xl"></div>
            <form className="relative space-y-6 rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-2xl">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700" htmlFor="first_name">Nombre</label>
                  <input
                    id="first_name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all"
                    placeholder="Ej. Juan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700" htmlFor="last_name">Apellido</label>
                  <input
                    id="last_name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all"
                    placeholder="Ej. Torne"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700" htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700" htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" required />
                <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                  Acepto la <a href="#" className="text-sky-600 underline">Política de Privacidad</a> y los <a href="#" className="text-sky-600 underline">Términos de Servicio</a>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-sky-200 hover:from-sky-600 hover:to-indigo-700 transition-all transform active:scale-[0.98]"
              >
                Enviar mi mensaje
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-32 pt-20 border-t border-slate-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Preguntas Frecuentes</h2>
            <p className="mt-4 text-slate-600">Resuelve tus dudas en segundos.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { q: '¿Cuál es el tiempo de entrega?', a: 'Los pedidos suelen entregarse en 24-48 horas laborables en la península.' },
              { q: '¿Puedo devolver un producto?', a: 'Sí, tienes 30 días naturales para realizar devoluciones de forma gratuita.' },
              { q: '¿Ofrecen garantía oficial?', a: 'Todos nuestros productos cuentan con 3 años de garantía oficial del fabricante.' }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 transition hover:shadow-lg">
                <h4 className="font-bold text-slate-900">{faq.q}</h4>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 flex justify-center">
          <Link
            to="/products"
            className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-sky-500 transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Volver al catálogo
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
