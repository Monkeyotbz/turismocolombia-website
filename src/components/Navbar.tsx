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

  const navbarClasses = `fixed w-full z-40 transition-all duration-300 top-[36px] ${
    isScrolled || !isHome
      ? 'bg-white shadow-md py-1.5'
      : 'bg-white/95 backdrop-blur-sm shadow-sm py-2.5'
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
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-50" onClick={toggleMenu}>
          <div
            className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg py-4 px-6"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="flex flex-col space-y-4 mt-16">
              <button onClick={() => { handleNavToSection('properties'); toggleMenu(); }} className="text-gray-700 hover:text-[#ff0000] font-medium text-base">
                Hospedajes
              </button>
              <button onClick={() => { handleNavToSection('tours'); toggleMenu(); }} className="text-gray-700 hover:text-[#ff0000] font-medium text-base">
                Tours
              </button>
              <Link to="/destinations" className="text-gray-700 hover:text-[#ff0000] font-medium text-base" onClick={toggleMenu}>
                Destinos
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-[#ff0000] font-medium text-base" onClick={toggleMenu}>
                Ofertas
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-[#ff0000] font-medium text-base" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/nosotros" className="text-gray-700 hover:text-[#ff0000] font-medium text-base" onClick={toggleMenu}>
                Nosotros
              </Link>
              <hr className="my-2" />
              <div className="flex flex-col space-y-3">
                {!user ? (
                  <>
                    {/* <Link 
                      to="/login" 
                      className="text-[#ff0000] border border-[#ff0000] text-center py-2 rounded-full font-medium"
                      onClick={toggleMenu}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      to="/register" 
                      className="text-center py-2 rounded-full font-medium"
                      style={{ backgroundColor: '#ff0000', color: '#fff' }}
                      onClick={toggleMenu}
                    >
                      Registrarse
                    </Link> */}
                  </>
                ) : (
                  <>
                    <div className='text-gray-700 hover:text-[#bd0000] font-medium text-base'>
                      <span>
                        Hola, {isSuperAdmin ? `${firstName} (Admin)` : firstName}
                      </span>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="text-center py-2 rounded-full font-medium"
                      style={{ backgroundColor: '#007bff', color: '#fff' }}
                      onClick={toggleMenu}
                    >
                      Mi Panel
                    </Link>
                    <button
                      onClick={() => { handleLogout(); toggleMenu(); }}
                      className="text-[#ff0000] border border-[#ff0000] text-center py-2 rounded-full font-medium"
                    >
                      Cerrar sesión
                    </button>
                    {isSuperAdmin && (
                      <Link
                        to="/admin"
                        className="text-center py-2 rounded-full font-medium"
                        style={{ backgroundColor: '#22c55e', color: '#fff' }}
                        onClick={toggleMenu}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;