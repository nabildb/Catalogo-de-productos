import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/services/supabase';
import type { Product } from '@/types/product';

const fallbackImages = [
  'https://placehold.co/600x400?text=Producto',
  'https://placehold.co/600x400?text=Imagen+2'
];

const hasSupabaseConfig =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

export function ProductDetailPage() {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!hasSupabaseConfig) {
        return;
      }

      const productId = Number(id);
      if (!productId || Number.isNaN(productId)) {
        setError('Producto no válido.');
        return;
      }

      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('products')
        .select(
          'id, name, description, price, image_url, image_url_2, category_id, is_active, created_at, categories ( id, name, description, created_at )'
        )
        .eq('id', productId)
        .single();

      if (!isMounted) {
        return;
      }

      if (fetchError || !data) {
        setError('No se pudo cargar el producto.');
        setLoading(false);
        return;
      }

      const categoryValue = Array.isArray(data.categories)
        ? data.categories[0]
        : data.categories;

      const normalizedProduct = {
        id: data.id,
        name: data.name,
        description: data.description ?? '',
        price: data.price ?? null,
        image_url: data.image_url ?? null,
        image_url_2: data.image_url_2 ?? null,
        category_id: data.category_id ?? null,
        category: categoryValue
          ? {
            id: categoryValue.id,
            name: categoryValue.name,
            description: categoryValue.description ?? null,
            created_at: categoryValue.created_at ?? null,
          }
          : null,
        is_active: data.is_active ?? null,
        created_at: data.created_at ?? null,
      } as Product;

      setProduct(normalizedProduct);
      setLoading(false);

      // Fetch related products
      if (normalizedProduct.category_id) {
        const { data: relatedData } = await supabase
          .from('products')
          .select('id, name, price, image_url, category_id')
          .eq('category_id', normalizedProduct.category_id)
          .neq('id', productId)
          .eq('is_active', true)
          .limit(4);

        if (relatedData) {
          setRelatedProducts(relatedData as Product[]);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const images = useMemo(() => {
    const productImages = [product?.image_url, product?.image_url_2].filter(
      (value): value is string => Boolean(value)
    );

    if (productImages.length > 0) {
      return productImages;
    }

    return fallbackImages;
  }, [product?.image_url, product?.image_url_2]);

  useEffect(() => {
    setSelected(0);
  }, [images.length]);

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

      <div className="px-6 py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: gallery with thumbnails */}
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col gap-3 items-start">
                {images.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    onClick={() => setSelected(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={`overflow-hidden rounded-lg border p-0.5 transition ${i === selected ? 'ring-2 ring-sky-300' : 'border-slate-200'
                      }`}
                  >
                    <img src={src} alt={`thumb ${i + 1}`} className="h-20 w-24 object-contain bg-white" />
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={images[selected]}
                    alt={`Producto ${product?.name ?? id} imagen ${selected + 1}`}
                    className="w-full h-96 object-contain bg-white p-6"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex gap-3 md:hidden overflow-x-auto">
                  {images.map((src, i) => (
                    <button
                      key={`m-${src}-${i}`}
                      onClick={() => setSelected(i)}
                      className={`overflow-hidden rounded-lg border p-0.5 transition ${i === selected ? 'ring-2 ring-sky-300' : 'border-slate-200'
                        }`}
                      aria-label={`Ver imagen ${i + 1}`}
                    >
                      <img src={src} alt={`thumb ${i + 1}`} className="h-16 w-24 object-contain bg-white" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
              <nav className="text-xs text-slate-400 mb-2">Home / Productos / {product?.category?.name ?? 'Detalle'}</nav>

              <h1 className="text-2xl font-semibold text-slate-900">{product?.name ?? `Producto ${id}`}</h1>

              <div className="mt-3 flex items-center gap-4">
                <div className="text-3xl font-extrabold text-sky-600">{formatPrice(product?.price ?? null)}</div>
                <div className={`rounded-full px-2 py-1 text-xs font-medium ${product?.is_active === false ? 'text-slate-500 bg-slate-100' : 'text-sky-700 bg-sky-100'}`}>
                  {product?.is_active === false ? 'No disponible' : 'En stock'}
                </div>
              </div>

              {product?.category?.name && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{product.category.name}</p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium text-slate-900">4.5</span>
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-xs text-slate-400">(120)</span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">{product?.description ?? 'Descripción breve del producto. Aquí puedes mostrar la ficha corta con los puntos clave.'}</p>

              {loading && <p className="mt-4 text-xs text-slate-400">Cargando...</p>}
              {error && <p className="mt-4 text-xs text-rose-500">{error}</p>}

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
                    className="w-14 text-center text-sm px-2 py-2 outline-none"
                    aria-label="Cantidad"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <button className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700">
                  Agregar al carrito
                </button>

                <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Comprar ahora
                </button>
              </div>

            </div>
          </div>

          {/* New Sections: Description, Specs, Shipping */}
          <div className="mt-16 border-t border-slate-200 pt-12">
            <div className="flex border-b border-slate-200">
              {(['description', 'specs', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === tab
                    ? 'border-b-2 border-sky-500 text-sky-600'
                    : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {tab === 'description' ? 'Descripción' : tab === 'specs' ? 'Especificaciones' : 'Envio y Devoluciones'}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="animate-fadeIn space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">Sobre este producto</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {product?.description}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Nuestros productos están fabricados con los más altos estándares de calidad, asegurando
                    durabilidad y un rendimiento excepcional en cualquier situación. El diseño ergonómico
                    y moderno se integra perfectamente en tu estilo de vida.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="animate-fadeIn">
                  <table className="w-full border-collapse">
                    <tbody>
                      {[
                        ['Material', 'Premium Gradual'],
                        ['Dimensiones', 'Variable según modelo'],
                        ['Peso', 'Ligero y resistente'],
                        ['Garantía', '2 años de fabricante'],
                        ['Origen', 'Importado / Local']
                      ].map(([key, val]) => (
                        <tr key={key} className="border-b border-slate-100 last:border-0 text-sm">
                          <td className="py-3 font-semibold text-slate-900 w-1/3">{key}</td>
                          <td className="py-3 text-slate-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="animate-fadeIn space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-6">
                      <h4 className="font-bold text-slate-900 mb-2">Envío Rápido</h4>
                      <p className="text-sm text-slate-600">Entregamos en 24-48 horas en toda la península. Envío gratuito en pedidos superiores a 50€.</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-6">
                      <h4 className="font-bold text-slate-900 mb-2">Devoluciones Sencillas</h4>
                      <p className="text-sm text-slate-600">¿No es lo que esperabas? Tienes 30 días para realizar tu devolución de forma totalmente gratuita.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">También te puede interesar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group flex flex-col"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition group-hover:shadow-md">
                      <img
                        src={p.image_url ?? '/placeholder.png'}
                        alt={p.name}
                        className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{p.name}</h3>
                      <p className="mt-1 text-sky-600 font-bold">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
