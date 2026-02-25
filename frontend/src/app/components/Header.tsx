// Cabecera de la web: logo, navegación principal y botón de acceso/gestión.
import { Link } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import logoImage from '/LogoAuraSinFondo.png';

export function Header() {
  const { isAdmin, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo que enlaza al inicio */}
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="AURA Logo" className="h-10 w-auto" />
          </Link>

          {/* Navegación principal */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm text-gray-700 hover:text-[#5B9FE3] transition-colors">
              Inicio
            </Link>
            <Link to="/products" className="text-sm text-gray-700 hover:text-[#5B9FE3] transition-colors">
              Productos
            </Link>
            <Link to="/about" className="text-sm text-gray-700 hover:text-[#5B9FE3] transition-colors">
              Acerca de
            </Link>
            <Link to="/contact" className="text-sm text-gray-700 hover:text-[#5B9FE3] transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Área de usuario/admin: muestra login admin o botón de cerrar sesión */}
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="px-4 py-2 bg-gradient-to-r from-[#00D4FF] via-[#5B9FE3] to-[#A855F7] text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium"
              >
                Acceso Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
