import { Header } from '@/app/components/Header';
import { Link, useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <div className="px-6 py-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Detalle</p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Producto {id}
            </h1>
          </div>
          <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-cyan-100 via-sky-100 to-purple-100 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Imagen
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Aquí podrás mostrar la información detallada del producto desde Supabase,
            incluyendo imágenes, descripción extendida, precio y disponibilidad.
          </p>
          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-sky-500 transition hover:text-sky-600"
          >
            Volver al catálogo
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
