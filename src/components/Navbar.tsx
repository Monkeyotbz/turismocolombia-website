import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Importa el contexto

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } = useUser(); // Usa el contexto global

  const isHome = location.pathname === '/';

  // Efecto para scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavToSection = (id: string) => {
    // Si no estamos en la home, navegamos primero y luego hacemos scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', `/#${id}`);
        }
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `/#${id}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Limpia el usuario del contexto
    navigate('/');
  };

  const navbarClasses = `fixed w-full z-40 transition-all duration-300 top-[36px] bg-white shadow-md ${
    isScrolled ? 'py-1.5' : 'py-2.5'
  }`;

  const handleSearch = (searchParams: { destination: string; checkIn: string; checkOut: string; guests: number; }) => {
    const q = searchParams.destination?.trim();
    const params = new URLSearchParams();
    if (q) params.append('destination', q);
    navigate(`/properties?${params.toString()}`);
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) =>
    `text-lg font-bold transition-colors px-4 ${
      isActive(path)
        ? 'text-[#ff0000]'
        : 'text-gray-800 hover:text-[#ff0000]'
    }`;

  const firstName = user?.name
    ? user.name.split(' ')[0]
    : user?.email
    ? user.email.split('@')[0]
    : '';
  const isSuperAdmin = user?.rol === 'superadmin';

  return (
    <>
      {/* Announcement ribbon */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-sm z-50">
        <div className="container mx-auto text-center py-2 px-4">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="text-lg">🌴</span>
            <span className="font-medium">Vive Colombia: Tours, Hospedajes y Aventuras Inolvidables</span>
            <span aria-hidden className="text-lg">🌴</span>
          </div>
        </div>
      </div>

      <nav className={navbarClasses}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-none mr-4 sm:mr-8">
          <img
            src="/turismo colombia fit logo-02.png"
            alt="Logo de Turismo Colombia"
            className="h-14 sm:h-16 md:h-20 w-auto max-w-[150px] sm:max-w-[180px] md:max-w-[200px] object-contain"
          />
        </Link>

        {/* Menú central - solo escritorio */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-4">
          <button onClick={() => { navigate('/'); }} className={linkClasses('/')}>Home</button>
          <button onClick={() => handleNavToSection('properties')} className={linkClasses('/properties')}>Hospedajes</button>
          <button onClick={() => handleNavToSection('tours')} className={linkClasses('/tours')}>Tours</button>
          <Link to="/nosotros" className={linkClasses('/nosotros')}>Nosotros</Link>
          <Link to="/destinations" className={linkClasses('/destinations')}>Destinos</Link>
          <Link to="/blog" className={linkClasses('/blog')}>Blog</Link>
        </div>

        {/* Barra de búsqueda integrado - solo escritorio */}
        <div className="hidden lg:flex items-center ml-6 mr-4 flex-none">
          <div className="w-80">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Botones de sesión o usuario - solo escritorio */}
        {!user ? (
          <div className="hidden lg:flex items-center space-x-2 flex-none">
            {/* <Link
              to="/login"
              className="text-base md:text-sm font-semibold border-2 border-gray-300 text-gray-800 bg-white rounded-full px-6 md:px-3 py-2 md:py-1 transition-colors duration-200 flex items-center justify-center whitespace-nowrap hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000]"
              style={{ minWidth: 120, minHeight: 40 }}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="text-base md:text-sm font-semibold bg-[#ff0000] hover:bg-[#ff0000] text-white rounded-full px-6 md:px-3 py-2 md:py-1 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
              style={{ minWidth: 120, minHeight: 40 }}
            >
              Registrarse
            </Link> */}
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-2 flex-none ml-4">
            <span className="font-semibold text-center text-gray-900 !text-gray-900" style={{ color: "#111" }}>
              Hola, {isSuperAdmin ? `${firstName} (Admin)` : firstName}
            </span>
            <Link
              to="/dashboard"
              className="text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 transition-colors"
            >
              Mi Panel
            </Link>
            <button
              onClick={handleLogout}
              className="text-base font-semibold border-2 border-gray-300 text-gray-800 bg-white rounded-full px-4 py-2 transition-colors hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000]"
            >
              Cerrar sesión
            </button>
            <Link to="/properties" className="ml-3 text-sm font-semibold bg-gradient-to-r from-[#ff6b6b] to-[#ff3b3b] text-white rounded-full px-4 py-2 shadow">Buscar</Link>
            {isSuperAdmin && (
              <a
                href="http://localhost:5174/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2 rounded-full font-medium"
                style={{ backgroundColor: '#22c55e', color: '#fff' }}
                onClick={toggleMenu}
              >
                Admin Dashboard
              </a>
            )}
          </div>
        )}

        {/* Botón hamburguesa - solo móvil */}
        <button
          className="flex lg:hidden text-gray-800 text-3xl ml-auto"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={toggleMenu}>
          <div
            className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del menú */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/turismo colombia fit logo 2.png"
                  alt="Logo"
                  className="h-10 w-auto"
                />
              </div>
              <button
                onClick={toggleMenu}
                className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navegación */}
            <div className="flex flex-col py-6 px-4 space-y-1">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium"
                onClick={toggleMenu}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              
              <button
                onClick={() => { handleNavToSection('properties'); toggleMenu(); }}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium text-left w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hospedajes
              </button>

              <button
                onClick={() => { handleNavToSection('tours'); toggleMenu(); }}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium text-left w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tours
              </button>

              <Link
                to="/destinations"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium"
                onClick={toggleMenu}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destinos
              </Link>

              <Link
                to="/blog"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium"
                onClick={toggleMenu}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Blog
              </Link>

              <Link
                to="/nosotros"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium"
                onClick={toggleMenu}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nosotros
              </Link>
            </div>

            {/* Footer del menú con contacto */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-4">
              <a
                href="https://wa.me/573145284548?text=Hola,%20me%20gustaría%20obtener%20más%20información"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;