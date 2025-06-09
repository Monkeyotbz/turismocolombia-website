import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Limpia el usuario del contexto
    navigate('/');
  };

  const navbarClasses = `fixed w-full z-40 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  } top-[10px]`;

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) =>
    `text-lg font-bold transition-colors px-4 ${
      isHome && !isScrolled
        ? isActive(path)
          ? 'text-[#bd0000]'
          : 'text-white hover:text-[#bd0000]'
        : isActive(path)
        ? 'text-[#bd0000]'
        : 'text-gray-800 hover:text-[#bd0000]'
    }`;

  const firstName = user?.name
    ? user.name.split(' ')[0]
    : user?.email
    ? user.email.split('@')[0]
    : '';
  const isSuperAdmin = user?.rol === 'superadmin';

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-8 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-none mr-8">
          <img
            src="/turismo colombia fit logo-02.png"
            alt="Logo de Turismo Colombia"
            className="h-20 w-auto max-w-[200px] object-contain"
          />
        </Link>

        {/* Menú central - solo escritorio */}
        <div className="hidden lg:flex flex-1 justify-center mx-2 items-center space-x-1">
          <Link to="/" className={linkClasses('/')}>Home</Link>
          <Link to="/nosotros" className={linkClasses('/nosotros')}>Nosotros</Link>
          <Link to="/tours" className={linkClasses('/tours')}>Tours</Link>
          <Link to="/properties" className={linkClasses('/properties')}>Hospedajes</Link>
          <Link to="/destinations" className={linkClasses('/destinations')}>Destinos</Link>
          <Link to="/blog" className={linkClasses('/blog')}>Blog</Link>
        </div>

        {/* Botones de sesión o usuario - solo escritorio */}
        {!user ? (
          <div className="hidden lg:flex items-center space-x-2 flex-none ml-4">
            <Link
              to="/login"
              className="text-base md:text-sm font-semibold border-2 border-gray-300 text-gray-800 bg-white rounded-full px-6 md:px-3 py-2 md:py-1 transition-colors duration-200 flex items-center justify-center whitespace-nowrap hover:bg-red-600 hover:text-white hover:border-red-600"
              style={{ minWidth: 120, minHeight: 40 }}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="text-base md:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-full px-6 md:px-3 py-2 md:py-1 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
              style={{ minWidth: 120, minHeight: 40 }}
            >
              Registrarse
            </Link>
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
              className="text-base font-semibold border-2 border-gray-300 text-gray-800 bg-white rounded-full px-4 py-2 transition-colors hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              Cerrar sesión
            </button>
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
              <Link to="/properties" className="text-gray-700 hover:text-[#bd0000] font-medium text-base" onClick={toggleMenu}>
                Hospedajes
              </Link>
              <Link to="/destinations" className="text-gray-700 hover:text-[#bd0000] font-medium text-base" onClick={toggleMenu}>
                Destinos
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-[#bd0000] font-medium text-base" onClick={toggleMenu}>
                Ofertas
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-[#bd0000] font-medium text-base" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/nosotros" className="text-gray-700 hover:text-[#bd0000] font-medium text-base" onClick={toggleMenu}>
                Nosotros
              </Link>
              <hr className="my-2" />
              <div className="flex flex-col space-y-3">
                {!user ? (
                  <>
                    <Link 
                      to="/login" 
                      className="text-[#bd0000] border border-[#bd0000] text-center py-2 rounded-full font-medium"
                      onClick={toggleMenu}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      to="/register" 
                      className="text-center py-2 rounded-full font-medium"
                      style={{ backgroundColor: '#bd0000', color: '#fff' }}
                      onClick={toggleMenu}
                    >
                      Registrarse
                    </Link>
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
                      className="text-[#bd0000] border border-[#bd0000] text-center py-2 rounded-full font-medium"
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
  );
};

export default Navbar;