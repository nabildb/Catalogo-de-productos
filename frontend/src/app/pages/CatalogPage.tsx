import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { supabase } from '@/services/supabase';
import type { Product } from '@/types/product';

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Producto 1',
    description:
      'Esta es una breve descripción del producto. Proporciona información básica sobre el artículo.',
    category: 'Electrónica',
  },
  {
    id: 2,
    name: 'Producto 2',
    description:
      'Otra descripción de producto va aquí. Este texto explica de qué trata el producto.',
    category: 'Ropa',
  },
  {
    id: 3,
    name: 'Producto 3',
    description:
      'Texto de descripción para este producto. Más detalles sobre las características y beneficios.',
    category: 'Hogar',
  },
  {
    id: 4,
    name: 'Producto 4',
    description:
      'Descripción corta del producto para mostrar lo esencial y generar interés.',
    category: 'Deportes',
  },
  {
    id: 5,
    name: 'Producto 5',
    description: 'Un resumen claro que destaca el valor principal del producto.',
    category: 'Libros',
  },
  {
    id: 6,
    name: 'Producto 6',
    description: 'Información breve y directa sobre sus ventajas más importantes.',
    category: 'Electrónica',
  },
  {
    id: 7,
    name: 'Producto 7',
    description: 'Descripción concisa para ayudar a decidir rápidamente.',
    category: 'Ropa',
  },
  {
    id: 8,
    name: 'Producto 8',
    description: 'Detalles clave del producto con un lenguaje simple.',
    category: 'Hogar',
  },
  {
    id: 9,
    name: 'Producto 9',
    description: 'Breve texto que comunica el beneficio principal del artículo.',
    category: 'Deportes',
  },
];

const categories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros'];

const hasSupabaseConfig =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

export function CatalogPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      if (!hasSupabaseConfig) {
        return;
      }

      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('id, name, description, category')
        .order('id', { ascending: true });

      if (!isMounted) {
        return;
      }

      if (fetchError) {
        setError('No se pudieron cargar los productos desde Supabase.');
        setLoading(false);
        return;
      }

      setProducts((data ?? []) as Product[]);
      setLoading(false);
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return products;
    }

    return products.filter((product) =>
      selectedCategories.includes(product.category ?? '')
    );
  }, [products, selectedCategories]);

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((value) => value !== category)
        : [...prev, category]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Categorías</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-2 py-1 transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                  />
                  {category}
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 w-full rounded-xl border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-500 transition hover:bg-sky-50"
            >
              Limpiar filtros
            </button>
          </aside>

          <section>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-sky-500">
                Catálogo de Productos
              </h1>
              <p className="text-sm text-slate-500">
                {visibleProducts.length} productos
              </p>
              {!hasSupabaseConfig && (
                <p className="text-xs text-amber-500">
                  Configura tus variables de entorno de Supabase para ver los
                  productos reales.
                </p>
              )}
              {error && <p className="text-xs text-rose-500">{error}</p>}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white"
                    />
                  ))
                : visibleProducts.map((product) => (
                    <article
                      key={product.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-cyan-100 via-sky-100 to-purple-100 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Imagen
                      </div>
                      <div className="space-y-3 p-6">
                        <h3 className="text-base font-semibold text-slate-900">
                          {product.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {product.description}
                        </p>
                        <Link
                          to={`/product/${product.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 transition hover:text-sky-600"
                        >
                          Ver Detalles
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
