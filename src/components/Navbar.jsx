//import {Link} from 'react-router-dom'
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <a 
                  href="./carrito.html" 
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  Carrito
                </a>
              </li>
            </ul>
            <a 
              href="./catalogo.html" 
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
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
              <a 
                href="./carrito.html" 
                className="block text-gray-700 hover:text-gray-900 transition"
              >
                Carrito
              </a>
            </li>
            <li>
              <a 
                href="./catalogo.html" 
                className="block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium text-center"
              >
                Comprar Ahora
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}