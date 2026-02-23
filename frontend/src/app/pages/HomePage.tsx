import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { supabase } from '@/services/supabase';
import type { Product } from '@/types/product';
import logoImage from '/LogoAuraSinFondo.png';

const fallbackFeatured: Product[] = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción breve del producto destacado',
    category: { id: 1, name: 'Electrónica' },
    price: 129.99,
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción breve del producto destacado',
    category: { id: 2, name: 'Ropa' },
    price: 79.5,
  },
  {
    id: 3,
    name: 'Producto 3',
    description: 'Descripción breve del producto destacado',
    category: { id: 3, name: 'Hogar' },
    price: 54.0,
  },
];

const hasSupabaseConfig =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] =
    useState<Product[]>(fallbackFeatured);

  useEffect(() => {
    let isMounted = true;

    async function loadFeatured() {
      if (!hasSupabaseConfig) {
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select(
          'id, name, description, price, image_url, categories ( id, name, description, created_at )'
        )
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!isMounted || error) {
        return;
      }

      const normalized = (data ?? []).map((row) => {
        const categoryValue = Array.isArray(row.categories)
          ? row.categories[0]
          : row.categories;

        return {
          id: row.id,
          name: row.name,
          description: row.description ?? '',
          price: row.price ?? null,
          image_url: row.image_url ?? null,
          category: categoryValue
            ? {
              id: categoryValue.id,
              name: categoryValue.name,
              description: categoryValue.description ?? null,
              created_at: categoryValue.created_at ?? null,
            }
            : null,
        } as Product;
      });

      setFeaturedProducts(normalized);
    }

    loadFeatured();

    return () => {
      isMounted = false;
    };
  }, []);

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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <section className="bg-gradient-to-br from-[#00D4FF]/10 via-[#5B9FE3]/10 to-[#A855F7]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logoImage} alt="AURA Logo" className="h-20 w-auto mx-auto mb-8" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] bg-clip-text text-transparent mb-6">
              Bienvenido a AURA
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Descubre nuestra selección de productos de alta calidad diseñados para mejorar tu vida diaria.
              Innovación, calidad y compromiso en cada producto.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg"
            >
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Productos Destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-[#00D4FF]/20 via-[#5B9FE3]/20 to-[#A855F7]/20 flex items-center justify-center text-xs text-gray-400">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    'Sin imagen'
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{product.category?.name ?? 'Sin categoría'}</span>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm text-[#5B9FE3] hover:text-[#A855F7] transition-colors"
                  >
                    Ver más →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block text-[#5B9FE3] hover:text-[#A855F7] transition-colors font-medium"
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Nuestro Equipo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] bg-clip-text text-transparent mb-4">
                  Creadores de AURA
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Somos un equipo apasionado de profesionales dedicados a crear productos excepcionales.
                  Nuestra misión es combinar innovación, diseño y funcionalidad para ofrecer soluciones
                  que realmente marquen la diferencia.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Con años de experiencia en el sector, nos comprometemos a mantener los más altos
                  estándares de calidad y a escuchar las necesidades de nuestros clientes.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/about"
                    className="px-6 py-3 border-2 border-[#5B9FE3] text-[#5B9FE3] rounded-lg hover:bg-[#5B9FE3] hover:text-white transition-all duration-300 font-medium"
                  >
                    Conocer más
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Contactar
                  </Link>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src="TEAM.png"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#00D4FF]/10 via-[#5B9FE3]/10 to-[#A855F7]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Listo para explorar nuestros productos?
            </h2>
            <p className="text-gray-700 mb-8">
              Descubre toda nuestra gama de productos y encuentra exactamente lo que necesitas.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg"
            >
              Ir al Catálogo
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
