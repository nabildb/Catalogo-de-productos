import { Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import logoImage from '/vite.svg';

export function HomePage() {
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
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-[#00D4FF]/20 via-[#5B9FE3]/20 to-[#A855F7]/20 flex items-center justify-center">
                  <span className="text-xs text-gray-400">PRODUCTO {num}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Producto {num}</h3>
                  <p className="text-sm text-gray-600 mb-3">Descripción breve del producto destacado</p>
                  <Link
                    to={`/product/${num}`}
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
                    src="https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBjcmVhdGl2ZSUyMHByb2Zlc3Npb25hbHN8ZW58MXx8fHwxNzcwMTQwNTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Equipo AURA"
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
    </div>
  );
}
