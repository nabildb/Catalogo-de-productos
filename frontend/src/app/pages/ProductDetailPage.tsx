import React, { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Link, useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);

  const images = [
    'https://placehold.co/600x400?text=Producto',
    'https://placehold.co/600x400?text=Imagen+2',
    'https://placehold.co/600x400?text=Imagen+3',
  ];

  const price = 129.99;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <div className="px-6 py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: galería */}
            <div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={images[selected]}
                  alt={`Producto ${id} imagen ${selected + 1}`}
                  className="w-full h-72 object-cover"
                />
              </div>

              <div className="mt-4 flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setSelected(i)}
                    className={`overflow-hidden rounded-lg border p-0.5 transition ${
                      i === selected ? 'border-sky-500' : 'border-slate-200'
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <img src={src} alt={`thumb ${i + 1}`} className="h-16 w-24 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: detalles */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Detalle</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Producto {id}</h1>

              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-2xl font-extrabold text-slate-900">${price.toFixed(2)}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">En stock</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Descripción breve del producto. Aquí puedes mostrar la ficha corta con
                los puntos clave: materiales, uso recomendado y beneficios principales.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Material: Algodón orgánico</li>
                <li>• Dimensiones: 30 × 20 × 10 cm</li>
                <li>• Envío: Disponible en 24–72 horas</li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="inline-flex w-full items-center justify-center rounded-lg bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white shadow hover:opacity-95 sm:w-auto">Agregar al carrito</button>
                <a href="/contact" className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto">Contactar vendedor</a>
              </div>

              <div className="mt-6">
                <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 transition hover:text-sky-600">
                  ← Volver al catálogo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
