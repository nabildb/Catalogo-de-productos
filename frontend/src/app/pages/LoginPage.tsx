import { Header } from '@/app/components/Header';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <div className="px-6 py-12">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Ingresar</h1>
          <p className="mt-2 text-sm text-slate-500">Accede a tu cuenta de cliente.</p>
          <form className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="login-email">
                Correo
              </label>
              <input
                id="login-email"
                type="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
                placeholder="tu@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="login-password">
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
