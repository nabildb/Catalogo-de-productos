// Página de acceso admin: inicio de sesión para gestionar el catálogo.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { supabase } from '@/services/supabase';

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <div className="px-6 py-12">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Acceso Admin</h1>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa con tus credenciales administrativas.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600 border border-rose-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="admin-email">
                Correo
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
                placeholder="admin@aura.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="admin-password">
                Contraseña
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-sky-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <Link
              to="/"
              className="block text-center text-sm text-slate-700 hover:text-slate-900 mt-4"
            >
              Volver al inicio
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
