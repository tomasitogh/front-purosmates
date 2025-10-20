import { useState } from 'react';
<<<<<<< Updated upstream
import { Link, useNavigate } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
<<<<<<< Updated upstream
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { totalQty, setOpen } = useCart();
=======
  const { user, isAuthenticated, logout } = useAuth();
  const { totalQty } = useCart();
>>>>>>> Stashed changes
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

<<<<<<< Updated upstream
  const handleLogout = () => {
    logout();
    navigate('/');
=======
  const handleCartClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      navigate('/carrito');
    }
>>>>>>> Stashed changes
  };

  return (
    <header className="bg-[#2d5d52] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
<<<<<<< Updated upstream
            <Link to="/" className="flex items-center">
=======
            <button onClick={() => navigate('/')} className="flex items-center focus:outline-none">
>>>>>>> Stashed changes
              <img 
                src="./img/favicon.ico" 
                alt="Puros Mates Logo" 
                className="h-8 w-8"
              />
<<<<<<< Updated upstream
            </Link>
            <Link 
              to="/" 
              className="text-xl font-bold text-[#F5F5DC]-800 hover:text-white-600 transition"
            >
              PUROS MATES
            </Link>
=======
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-gray-800 hover:text-gray-600 transition focus:outline-none"
            >
              PUROS MATES
            </button>
>>>>>>> Stashed changes
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
<<<<<<< Updated upstream
                <Link 
                  to="/" 
                  className="text-white-700 hover:text-beige-900 transition"
                >
                  Productos
                </Link>
=======
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-700 hover:text-gray-900 transition focus:outline-none"
                >
                  Productos
                </button>
>>>>>>> Stashed changes
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCartClick}
                  className="relative text-gray-700 hover:text-gray-900 transition focus:outline-none"
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
                    className="bg-[#2d5d52] text-white px-6 py-2 rounded-lg hover:bg-[#2d5d52]/90 transition shadow-sm"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
<<<<<<< Updated upstream
=======
            <button
              onClick={() => navigate('/')}
              className="bg-[#D4AF37] text-[#2d5d52] px-6 py-2 rounded-lg hover:bg-[#DAA520] transition font-semibold focus:outline-none"
            >
              Comprar Ahora
            </button>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-gray-900 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
=======
              <button
                onClick={() => navigate('/')}
                className="block text-gray-700 hover:text-gray-900 transition focus:outline-none text-left"
              >
                Productos
              </button>
>>>>>>> Stashed changes
            </li>
            <li>
              <button
                type="button"
<<<<<<< Updated upstream
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); setIsMenuOpen(false); }}
                className="relative text-gray-700 hover:text-gray-900 transition"
                aria-label="Abrir carrito"
=======
                onClick={handleCartClick}
                className="relative text-gray-700 hover:text-gray-900 transition focus:outline-none"
                aria-label="Ir al carrito"
>>>>>>> Stashed changes
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
                  className="w-full bg-[#2d5d52] text-white px-6 py-2 rounded-lg hover:bg-[#2d5d52]/90 transition shadow-sm text-center"
                >
                  Login
                </button>
              )}
            </li>
<<<<<<< Updated upstream
=======
            <li>
              <button
                onClick={() => navigate('/')}
                className="block bg-[#D4AF37] text-[#2d5d52] px-6 py-2 rounded-lg hover:bg-[#DAA520] transition font-semibold text-center w-full focus:outline-none"
              >
                Comprar Ahora
              </button>
            </li>
>>>>>>> Stashed changes
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