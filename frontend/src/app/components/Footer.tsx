import { Link } from 'react-router-dom';
import logoImage from '/LogoAuraSinFondo.png';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', href: 'https://www.facebook.com', icon: Facebook },
        { name: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
        { name: 'Twitter', href: 'https://www.twitter.com', icon: Twitter },
    ];

    return (
        <footer className="mt-20 border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center">
                            <img src={logoImage} alt="AURA Logo" className="h-10 w-auto" />
                        </Link>
                        <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-500">
                            AURA - Tu destino premium para los mejores productos tecnológicos, hogar y más.
                            Calidad y diseño inspirador en cada detalle.
                        </p>
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="rounded-full bg-slate-50 p-2 text-slate-400 transition hover:bg-sky-50 hover:text-sky-500"
                                    aria-label={social.name}
                                >
                                    <span className="sr-only">{social.name}</span>
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Tienda</h3>
                        <ul className="mt-4 space-y-2">
                            {[
                                { name: 'Catálogo', path: '/products' },
                                { name: 'Novedades', path: '/products?sort=recent' },
                                { name: 'Promociones', path: '/products' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-slate-500 hover:text-sky-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Compañía</h3>
                        <ul className="mt-4 space-y-2">
                            {[
                                { name: 'Acerca de', path: '/about' },
                                { name: 'Contacto', path: '/contact' },
                                { name: 'Términos y Condiciones', path: '#' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-slate-500 hover:text-sky-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Contacto</h3>
                        <ul className="mt-4 space-y-3">
                            <li className="flex gap-3 text-sm text-slate-500">
                                <span>📍</span>
                                <span>Calle Rosa, Melano 69</span>
                            </li>
                            <li className="flex gap-3 text-sm text-slate-500">
                                <span>📞</span>
                                <span>+34 676 76 67 67</span>
                            </li>
                            <li className="flex gap-3 text-sm text-slate-500">
                                <span>✉️</span>
                                <span>info@aura.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-100 pt-8 text-center">
                    <p className="text-xs text-slate-400">
                        &copy; {currentYear} AURA. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
