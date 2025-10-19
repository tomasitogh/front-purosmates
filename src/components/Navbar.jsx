//import {Link} from 'react-router-dom'
import { useState } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalQty, setOpen } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="./index.html" className="flex items-center">
              <img 
                src="./img/favicon.ico" 
                alt="Puros Mates Logo" 
                className="h-8 w-8"
              />
            </a>
            <a 
              href="./index.html" 
              className="text-xl font-bold text-gray-800 hover:text-gray-600 transition"
            >
              PUROS MATES
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="./catalogo.html" 
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  Productos
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
                  className="relative text-gray-700 hover:text-gray-900 transition"
                  aria-label="Abrir carrito"
                >
                  🛒 Carrito
                  {totalQty > 0 && (
                    <span className="absolute -top-2 -right-3 text-xs bg-green-600 text-white rounded-full w-5 h-5 grid place-items-center">
                      {totalQty}
                    </span>
                  )}
                </button>
              </li>
              <li>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">
                      Hola, {user?.name || 'Usuario'}
                    </span>
                    <button
                      onClick={logout}
                      className="text-sm text-gray-600 hover:text-gray-900 transition"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-gray-700 hover:text-gray-900 transition"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
            <a 
              href="./catalogo.html" 
              className="bg-[#D4AF37] text-[#2d5d52] px-6 py-2 rounded-lg hover:bg-[#DAA520] transition font-semibold"
            >
              Comprar Ahora
            </a>
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="py-4 space-y-4">
            <li>
              <a 
                href="./catalogo.html" 
                className="block text-gray-700 hover:text-gray-900 transition"
              >
                Productos
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
                className="relative text-gray-700 hover:text-gray-900 transition"
                aria-label="Abrir carrito"
              >
                🛒 Carrito
                {totalQty > 0 && (
                  <span className="absolute -top-2 -right-3 text-xs bg-green-600 text-white rounded-full w-5 h-5 grid place-items-center">
                    {totalQty}
                  </span>
                )}
              </button>
            </li>

            <li>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <span className="block text-gray-700 font-medium">
                    Hola, {user?.name || 'Usuario'}
                  </span>
                  <button
                    onClick={logout}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="block text-gray-700 hover:text-gray-900 transition"
                >
                  Login
                </button>
              )}
            </li>
            <li>
              <a 
                href="./catalogo.html" 
                className="block bg-[#D4AF37] text-[#2d5d52] px-6 py-2 rounded-lg hover:bg-[#DAA520] transition font-semibold text-center"
              >
                Comprar Ahora
              </a>
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