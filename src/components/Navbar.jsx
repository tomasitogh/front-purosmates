import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";
import logoPM from '../assets/logo-purosmates.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [q, setQ] = useState("");

  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { totalQty } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQ(params.get("q") || "");
  }, [location.search]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      navigate('/carrito');
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (q.trim()) params.set("q", q.trim());
    else params.delete("q");
    navigate({ pathname: "/", search: params.toString() });
  };

  return (
    <header className="bg-[#2d5d52] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img
                src={logoPM}
                alt="Puros Mates"
                className="h-10 w-10 md:h-10 md:w-10 object-contain rounded-full"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </Link>
            <Link
              to="/"
              className="text-xl font-semibold tracking-wide text-[#F5F5DC]"
            >
              PUROS MATES
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <ul className="flex items-center gap-2">
              <div className="hidden md:flex items-center space-x-6">
                <ul className="flex items-center space-x-6">
                  <li>
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center h-10 px-4 rounded-xl font-medium text-[#F5F5DC] border border-[#F5F5DC]/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 transition"
                    >
                      Productos
                    </Link>
                  </li>

                  {/* 🔎 Barra de búsqueda */}
                  <li className="flex items-center">
                    <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
                      <input
                        type="search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Buscar productos…"
                        aria-label="Buscar productos"
                        className="w-56 rounded-md border border-gray-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#2d5d52]"
                      />
                      <button
                        type="submit"
                        className="bg-white/10 text-white px-3 py-1.5 rounded-md hover:bg-white/20 transition"
                      >
                        Buscar
                      </button>
                    </form>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={handleCartClick}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-xl font-medium text-white border border-white/60 bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition relative"
                      aria-label="Ir al carrito"
                    >
                      🛒
                      {totalQty > 0 && (
                        <span className="absolute -top-2 -right-3 text-xs bg-green-600 text-white rounded-full w-5 h-5 grid place-items-center">
                          {totalQty}
                        </span>
                      )}
                    </button>
                  </li>

                  {isAuthenticated && isAdmin() && (
                    <li>
                      <Link
                        to="/admin"
                        className="text-gray-700 hover:text-gray-900 transition font-medium"
                      >
                        🔧 Panel Admin
                      </Link>
                    </li>
                  )}

                  <li>
                    {isAuthenticated ? (
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-700 font-medium">
                          Hola, {user?.name || user?.email || 'Usuario'}
                        </span>
                        <button
                          onClick={handleLogout}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition shadow-sm"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="inline-flex items-center justify-center h-10 px-4 rounded-xl font-medium text-white border border-white/60 bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition"
                      >
                        Login
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex flex-col space-y-1.5 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="py-4 space-y-4">
            <li>
              <Link
                to="/"
                className="block text-gray-700 hover:text-gray-900 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
            </li>

            <li>
              <form
                onSubmit={(e) => { onSearchSubmit(e); setIsMenuOpen(false); }}
                className="flex items-center gap-2"
              >
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar productos…"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2d5d52]"
                />
                <button
                  type="submit"
                  className="block text-gray-700 hover:text-gray-900 transition"
                >
                  Buscar
                </button>
              </form>
            </li>

            <li>
              <button
                type="button"
                onClick={handleCartClick}
                className="inline-flex items-center justify-center h-10 px-4 rounded-xl font-medium text-white border border-white/60 bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition w-full relative"
                aria-label="Ir al carrito"
              >
                🛒 Carrito
                {totalQty > 0 && (
                  <span className="absolute -top-2 -right-3 text-xs bg-green-600 text-white rounded-full w-5 h-5 grid place-items-center">
                    {totalQty}
                  </span>
                )}
              </button>
            </li>

            {isAuthenticated && isAdmin() && (
              <li>
                <Link
                  to="/admin"
                  className="block text-gray-700 hover:text-gray-900 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔧 Panel Admin
                </Link>
              </li>
            )}

            <li>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <span className="block text-gray-700 font-medium">
                    Hola, {user?.name || user?.email || 'Usuario'}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition shadow-sm text-center"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-center h-10 px-4 rounded-xl font-medium text-white border border-white/60 bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition w-full text-center"
                >
                  Login
                </button>
              )}
            </li>

            <li>
              <button
                onClick={() => { navigate('/'); setIsMenuOpen(false); }}
                className="block bg-[#D4AF37] text-[#2d5d52] px-6 py-2 rounded-lg hover:bg-[#DAA520] transition font-semibold text-center w-full focus:outline-none"
              >
                Comprar Ahora
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
