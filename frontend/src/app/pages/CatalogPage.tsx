// Página de catálogo: lista productos, filtros, ordenación y CRUD (para admin).
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { supabase } from '@/services/supabase';
import type { Product } from '@/types/product';
import { useAuth } from '@/app/context/AuthContext';
import { ProductModal } from '@/app/components/ProductModal';
import { productService } from '@/services/productService';
import { Footer } from '@/app/components/Footer';
import { ChevronDown } from 'lucide-react';

const fallbackCategories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros'];

const hasSupabaseConfig =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

export function CatalogPage() {
  const { isAdmin } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name' | 'recent'>('relevance');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Estados para modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSort, setIsModalOpenSort] = useState(false); // Nuevo estado para el Sort
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Carga productos y categorías desde Supabase (usado en montaje y tras CRUD)
  async function loadProducts() {
    if (!hasSupabaseConfig) return;

    setLoading(true);
    setError('');

    try {
      const [productResponse, categoryResponse] = await Promise.all([
        supabase
          .from('products')
          .select(
            'id, name, description, price, image_url, image_url_2, category_id, is_active, created_at, categories ( id, name, description, created_at )'
          )
          .eq('is_active', true)
          .order('id', { ascending: true }),
        supabase.from('categories').select('id, name').order('name', { ascending: true }),
      ]);

      if (productResponse.error || categoryResponse.error) {
        throw new Error('No se pudieron cargar los productos desde Supabase.');
      }

      const normalizedProducts = (productResponse.data ?? []).map((row) => {
        const categoryValue = Array.isArray(row.categories) ? row.categories[0] : row.categories;

        return {
          id: row.id,
          name: row.name,
          description: row.description ?? '',
          price: row.price ?? null,
          image_url: row.image_url ?? null,
          image_url_2: row.image_url_2 ?? null,
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

      const normalizedCategories = (categoryResponse.data ?? []).map((category) => category.name) ?? [];

      setProducts(normalizedProducts);
      setCategories(normalizedCategories.length > 0 ? normalizedCategories : fallbackCategories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Lista visible: aplica filtros de categoría, búsqueda, precio y ordenación
  const visibleProducts = useMemo(() => {
    let list = products.slice();

    if (selectedCategories.length > 0) {
      list = list.filter((product) => selectedCategories.includes(product.category?.name ?? ''));
    }

    if (query.trim() !== '') {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q) ||
          (p.category?.name ?? '').toLowerCase().includes(q)
      );
    }

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

    if (minPrice !== '') {
      list = list.filter((p) => Number(p.price ?? 0) >= Number(minPrice));
    }
    if (maxPrice !== '') {
      list = list.filter((p) => Number(p.price ?? 0) <= Number(maxPrice));
    }

    return list;
  }, [products, selectedCategories, query, sort, minPrice, maxPrice]);

  // Alterna selección de una categoría en los filtros
  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((value) => value !== category)
        : [...prev, category]
    );
  }

  // Guarda o actualiza producto usando el servicio y recarga la lista
  const handleSaveProduct = async (formData: any) => {
    if (editingProduct) {
      await productService.updateProduct(editingProduct.id, formData);
    } else {
      await productService.createProduct(formData);
    }
    loadProducts();
  };

  // Elimina un producto vía servicio y recarga la lista
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      await productService.deleteProduct(id);
      loadProducts();
    }
  };

  // Formatea precio para mostrar en la UI
  function formatPrice(price: Product['price']) {
    if (!price) return 'Precio no disponible';
    const numericPrice = typeof price === 'string' ? Number(price) : price;
    if (Number.isNaN(numericPrice)) return 'Precio no disponible';
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(numericPrice);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
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

            <div className="mt-8 pt-8 border-t border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Precio</h2>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
                <span className="text-slate-300">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategories([]);
                setMinPrice('');
                setMaxPrice('');
              }}
              className="mt-8 w-full rounded-xl border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-500 transition hover:bg-sky-50"
            >
              Limpiar filtros
            </button>
          </aside>

          <section>
            <nav className="mb-6 flex text-xs text-slate-400 gap-2 items-center">
              <Link to="/" className="hover:text-sky-500 transition">Inicio</Link>
              <span>/</span>
              <span className="text-slate-600 font-medium">Productos</span>
            </nav>

            <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 p-8 text-white shadow-lg shadow-sky-100 relative">
              <div className="relative z-10 max-w-md">
                <h2 className="text-3xl font-bold">Nuestra Colección</h2>
                <p className="mt-2 text-sky-50 opacity-90 text-sm leading-relaxed">
                  Descubre los productos más destacados de la temporada. Calidad premium garantizada.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Resultados</h1>
                  <p className="text-xs text-slate-500">Mostrando {visibleProducts.length} productos</p>
                </div>

                <div className="flex items-center gap-3 w-full max-w-xl">
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                      }}
                      className="whitespace-nowrap rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
                    >
                      + Añadir
                    </button>
                  )}

                  <label className="relative flex-1">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar..."
                      className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                  </label>

                  {/* NUEVO DROPDOWN CON ANIMACIÓN */}
                  <div className="relative inline-block text-left z-20">
                    <button
                      type="button"
                      onClick={() => setIsModalOpenSort(!isModalOpenSort)}
                      className="flex items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-sky-500 hover:bg-sky-50/50 focus:outline-none"
                    >
                      <span className="hidden sm:inline">
                        {sort === 'relevance' && 'Relevancia'}
                        {sort === 'recent' && 'Más recientes'}
                        {sort === 'price-asc' && 'Precio: bajo → alto'}
                        {sort === 'price-desc' && 'Precio: alto → bajo'}
                        {sort === 'name' && 'Nombre A → Z'}
                      </span>
                      <span className="sm:hidden">Ordenar</span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isModalOpenSort ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Contenedor del menú con animación de escala y opacidad */}
                    <div
                      className={`absolute right-0 mt-2 w-52 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out z-30 ${isModalOpenSort
                        ? 'transform opacity-100 scale-100'
                        : 'transform opacity-0 scale-95 pointer-events-none'
                        }`}
                    >
                      {[
                        { id: 'relevance', label: 'Relevancia' },
                        { id: 'recent', label: 'Más recientes' },
                        { id: 'price-asc', label: 'Precio: bajo → alto' },
                        { id: 'price-desc', label: 'Precio: alto → bajo' },
                        { id: 'name', label: 'Nombre A → Z' },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSort(option.id as any);
                            setIsModalOpenSort(false);
                          }}
                          className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm transition-colors ${sort === option.id
                            ? 'bg-sky-500 text-white font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-sky-500'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {/* Overlay para cerrar al hacer clic fuera */}
                    {isModalOpenSort && (
                      <div className="fixed inset-0 z-10" onClick={() => setIsModalOpenSort(false)} />
                    )}
                  </div>
                </div>
              </div>
              {error && <p className="text-xs text-rose-500">{error}</p>}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={`skeleton-${index}`} className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />
                ))
                : visibleProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative"
                  >
                    {isAdmin && (
                      <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-sky-50 text-sky-600 border border-slate-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-rose-50 text-rose-600 border border-slate-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-center p-6 bg-slate-50/50">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="bg-slate-50 rounded-md p-4 shadow-inner ring-1 ring-slate-100">
                          <svg width="72" height="56" viewBox="0 0 72 56" fill="none">
                            <rect width="72" height="56" rx="8" fill="#F1F5F9" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="px-6 pb-6 pt-4 flex-1 flex flex-col">
                      <div className="mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                          {product.category?.name ?? 'Sin categoría'}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
                      </div>
                      <div className="mt-3 text-xs text-slate-500 flex-1 line-clamp-3 leading-relaxed">
                        {product.description}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
                        <button className="flex-1 rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-600 transition">
                          Añadir al carrito
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          Detalles
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
      <Footer />
    </div>
  );
}