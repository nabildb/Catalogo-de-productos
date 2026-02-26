// Página de acceso admin: inicio de sesión para gestionar el catálogo.
// VISUAL: pantalla centrada con fondo atmosférico dark, card glassmorphism, inputs con focus AURA, loading spinner.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/services/supabase';
import logoImage from '/LogoAuraSinFondo.png';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Fondo atmosférico dark igual que el hero de HomePage */
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Fondo dark */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0d1b3e] to-slate-950" />
      {/* Blobs decorativos */}
      <div aria-hidden className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#00d4ff]/15 blur-[120px] pointer-events-none" />
      <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#a855f7]/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md aura-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logoImage}
            alt="AURA Logo"
            className="h-14 w-auto drop-shadow-[0_0_20px_rgba(0,212,255,0.35)]"
          />
        </div>

        {/* Card glassmorphism */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-white text-center">Acceso Admin</h1>
          <p className="mt-2 text-sm text-slate-400 text-center">
            Ingresa con tus credenciales administrativas.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {/* Error */}
            {error && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-400 text-center aura-fade-in-scale">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="admin-email">
                Correo
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aura.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white
                           placeholder:text-slate-600
                           focus:border-[#5B9FE3] focus:ring-2 focus:ring-[#5B9FE3]/30 focus:outline-none
                           transition-all duration-200"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="admin-password">
                Contraseña
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white
                           placeholder:text-slate-600
                           focus:border-[#5B9FE3] focus:ring-2 focus:ring-[#5B9FE3]/30 focus:outline-none
                           transition-all duration-200"
              />
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7]
                         px-5 py-3.5 text-sm font-bold text-white
                         hover:scale-[1.02] hover:shadow-[var(--shadow-glow-blue)]
                         active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  {/* Spinner SVG inline */}
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </>
              ) : 'Entrar'}
            </button>

            {/* Volver */}
            <Link
              to="/"
              className="block text-center text-sm text-slate-500 hover:text-[#5B9FE3] transition-colors duration-200 mt-2"
            >
              ← Volver al inicio
            </Link>
          </form>
        </div>

        {/* Pie decorativo */}
        <p className="mt-6 text-center text-xs text-slate-600">
          Solo para administradores autorizados · AURA {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
