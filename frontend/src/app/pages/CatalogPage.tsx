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
    category: { id: 1, name: 'Electrónica' },
    price: 129.99,
  },
  {
    id: 2,
    name: 'Producto 2',
    description:
      'Otra descripción de producto va aquí. Este texto explica de qué trata el producto.',
    category: { id: 2, name: 'Ropa' },
    price: 79.5,
  },
  {
    id: 3,
    name: 'Producto 3',
    description:
      'Texto de descripción para este producto. Más detalles sobre las características y beneficios.',
    category: { id: 3, name: 'Hogar' },
    price: 54.0,
  },
  {
    id: 4,
    name: 'Producto 4',
    description:
      'Descripción corta del producto para mostrar lo esencial y generar interés.',
    category: { id: 4, name: 'Deportes' },
    price: 64.99,
  },
  {
    id: 5,
    name: 'Producto 5',
    description: 'Un resumen claro que destaca el valor principal del producto.',
    category: { id: 5, name: 'Libros' },
    price: 24.99,
  },
  {
    id: 6,
    name: 'Producto 6',
    description: 'Información breve y directa sobre sus ventajas más importantes.',
    category: { id: 1, name: 'Electrónica' },
    price: 299.0,
  },
  {
    id: 7,
    name: 'Producto 7',
    description: 'Descripción concisa para ayudar a decidir rápidamente.',
    category: { id: 2, name: 'Ropa' },
    price: 49.99,
  },
  {
    id: 8,
    name: 'Producto 8',
    description: 'Detalles clave del producto con un lenguaje simple.',
    category: { id: 3, name: 'Hogar' },
    price: 89.0,
  },
  {
    id: 9,
    name: 'Producto 9',
    description: 'Breve texto que comunica el beneficio principal del artículo.',
    category: { id: 4, name: 'Deportes' },
    price: 110.0,
  },
];

const fallbackCategories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros'];

const hasSupabaseConfig =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

export function CatalogPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name' | 'recent'>('relevance');

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      if (!hasSupabaseConfig) {
        return;
      }

      setLoading(true);
      setError('');

      const [productResponse, categoryResponse] = await Promise.all([
        supabase
          .from('products')
          .select(
            'id, name, description, price, image_url, category_id, is_active, created_at, categories ( id, name, description, created_at )'
          )
          .eq('is_active', true)
          .order('id', { ascending: true }),
        supabase.from('categories').select('id, name').order('name', { ascending: true }),
      ]);

      if (!isMounted) {
        return;
      }

      if (productResponse.error || categoryResponse.error) {
        setError('No se pudieron cargar los productos desde Supabase.');
        setLoading(false);
        return;
      }

      const normalizedProducts = (productResponse.data ?? []).map((row) => {
        const categoryValue = Array.isArray(row.categories)
          ? row.categories[0]
          : row.categories;

        return {
          id: row.id,
          name: row.name,
          description: row.description ?? '',
          price: row.price ?? null,
          image_url: row.image_url ?? null,
          category_id: row.category_id ?? null,
          category: categoryValue
            ? {
                id: categoryValue.id,
                name: categoryValue.name,
                description: categoryValue.description ?? null,
                created_at: categoryValue.created_at ?? null,
              }
            : null,
          is_active: row.is_active ?? null,
          created_at: row.created_at ?? null,
        } as Product;
      });

      const normalizedCategories =
        (categoryResponse.data ?? []).map((category) => category.name) ?? [];

      const resolvedCategories =
        normalizedCategories.length > 0
          ? normalizedCategories
          : Array.from(
              new Set(
                normalizedProducts
                  .map((product) => product.category?.name)
                  .filter((value): value is string => Boolean(value))
              )
            );

      setProducts(normalizedProducts);
      setCategories(resolvedCategories);
      setLoading(false);
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    let list = products.slice();

    // Category filter
    if (selectedCategories.length > 0) {
      list = list.filter((product) => selectedCategories.includes(product.category?.name ?? ''));
    }

    // Search query
    if (query.trim() !== '') {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q) ||
          (p.category?.name ?? '').toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'price-asc') {
      list.sort((a, b) => (Number(a.price ?? 0) - Number(b.price ?? 0)));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (Number(b.price ?? 0) - Number(a.price ?? 0)));
    } else if (sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'recent') {
      list.sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      });
    }

    return list;
  }, [products, selectedCategories, query, sort]);

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

  function formatPrice(price: Product['price']) {
    if (price === null || price === undefined || price === '') {
      return 'Precio no disponible';
    }

    const numericPrice = typeof price === 'string' ? Number(price) : price;

    if (Number.isNaN(numericPrice)) {
      return 'Precio no disponible';
    }

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(numericPrice);
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-sky-600">Catálogo de Productos</h1>
                  <p className="text-sm text-slate-500">{visibleProducts.length} productos</p>
                </div>

                <div className="flex items-center gap-3 w-full max-w-xl">
                  <label className="relative flex-1">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar por nombre, categoría o descripción..."
                      className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                  </label>

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
                  >
                    <option value="relevance">Relevancia</option>
                    <option value="recent">Más recientes</option>
                    <option value="price-asc">Precio: bajo → alto</option>
                    <option value="price-desc">Precio: alto → bajo</option>
                    <option value="name">Nombre A→Z</option>
                  </select>
                </div>
              </div>
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
                      className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm hover:shadow-md transition group"
                    >
                      <div className="flex items-center justify-center p-6">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            loading="lazy"
                            className="h-36 w-auto object-contain"
                          />
                        ) : (
                          <div className="bg-slate-50 rounded-md p-4 shadow-inner ring-1 ring-slate-100">
                            <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                              <rect width="72" height="56" rx="8" fill="#F1F5F9" />
                              <path d="M22 34L30 24L38 34H22Z" fill="#E2E8F0" />
                              <rect x="44" y="18" width="8" height="8" rx="1" fill="#E2E8F0" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="px-6 pb-6 flex-1 flex flex-col">
                        <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{product.name}</h3>

                        <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
                          <div className="text-lg font-bold text-sky-600">{formatPrice(product.price)}</div>
                          <div className="text-xs text-slate-500">En stock</div>
                        </div>

                        <div className="mt-3 text-sm text-slate-600 flex-1 overflow-hidden">{product.description}</div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            className="rounded bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 transition"
                          >
                            Añadir al carrito
                          </button>

                          <Link
                            to={`/product/${product.id}`}
                            className="rounded border border-slate-200 px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50"
                          >
                            Ver detalles
                          </Link>
                        </div>
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
