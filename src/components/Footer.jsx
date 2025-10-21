import { Link } from 'react-router-dom';
import logoPM from "../assets/logo-purosmates.png";
import igLogo from "../assets/instagram.png";
import wppLogo from "../assets/wpp.png";

export default function Footer() {
  return (
    <footer className="bg-[#E8DCC4] text-[#3D5F54]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Desktop Layout - 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-12 items-start">
          {/* Logo Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/">
                <img 
                  src={logoPM} 
                  alt="Puros Mates Logo" 
                  className="h-20 w-20 object-contain p-1"
                />
              </Link>
            </div>
            <Link 
              to="/" 
              className="text-2xl font-bold text-[#3D5F54] hover:opacity-80 transition"
            >
              PUROS MATES
            </Link>
          </div>

          {/* Products Column */}
          <div>
            <Link to="/">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-6 hover:opacity-80 transition">
                Productos
              </h3>
            </Link>
            <ul className="space-y-3 text-lg">
              <li>
                <Link 
                  to="/?category=mates" 
                  className="hover:opacity-70 transition"
                >
                  Mates
                </Link>
              </li>
              <li>
                <Link 
                  to="/?category=bombillas" 
                  className="hover:opacity-70 transition"
                >
                  Bombillas
                </Link>
              </li>
              <li>
                <Link 
                  to="/?category=accesorios" 
                  className="hover:opacity-70 transition"
                >
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <Link to="/">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-6 hover:opacity-80 transition">
                Puros Mates
              </h3>
            </Link>
            <ul className="space-y-3 text-lg">
              {/*<li>
                <a 
                  href="./contacto.html" 
                  className="hover:opacity-70 transition"
                >
                  Contacto
                </a>
              </li>*/}
              {/*<li>
                <a 
                  href="./index.html" 
                  className="hover:opacity-70 transition"
                >
                  Sobre Nosotros
                </a>
              </li>*/}
            </ul>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.instagram.com/puros.mates/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="hover:opacity-80 transition"
              >
                <img 
                  src={igLogo} 
                  alt="Instagram" 
                  className="h-8 w-12 object-contain"
                />
              </a>
              <a 
                href="https://wa.me/5491130548207" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="hover:opacity-80 transition"
              >
                <img 
                  src={wppLogo} 
                  alt="WhatsApp" 
                  className="h-8 w-8 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Centered */}
        <div className="md:hidden flex flex-col items-center text-center space-y-10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Link to="/" className="mb-4">
              <img 
                src={logoPM} 
                alt="Puros Mates Logo" 
                className="h-32 w-32 object-contain p-1"
              />
            </Link>
            <Link 
              to="/" 
              className="text-3xl font-bold text-[#3D5F54] hover:opacity-80 transition"
            >
              PUROS MATES
            </Link>
          </div>

          {/* Products */}
          <div>
            <Link to="/">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-4 hover:opacity-80 transition">
                Productos
              </h3>
            </Link>
            <ul className="space-y-2 text-lg">
              <li>
                <Link 
                  to="/?category=mates" 
                  className="hover:opacity-70 transition"
                >
                  Mates
                </Link>
              </li>
              <li>
                <Link 
                  to="/?category=bombillas" 
                  className="hover:opacity-70 transition"
                >
                  Bombillas
                </Link>
              </li>
              <li>
                <Link 
                  to="/?category=accesorios" 
                  className="hover:opacity-70 transition"
                >
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <Link to="/">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-4 hover:opacity-80 transition">
                Puros Mates
              </h3>
            </Link>
            <ul className="space-y-2 text-lg">
              <li>
                <a 
                  href="./contacto.html" 
                  className="hover:opacity-70 transition"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a 
                  href="./index.html" 
                  className="hover:opacity-70 transition"
                >
                  Sobre Nosotros
                </a>
              </li>
            </ul>
            <div className="flex justify-center space-x-4 mt-6">
              <a 
                href="https://www.instagram.com/puros.mates/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="hover:opacity-80 transition"
              >
                <img 
                  src={igLogo} 
                  alt="Instagram" 
                  className="h-10 w-10 object-contain"
                />
              </a>
              <a 
                href="https://wa.me/5491130548207" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="hover:opacity-80 transition"
              >
                <img 
                  src={wppLogo} 
                  alt="WhatsApp" 
                  className="h-10 w-10 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#3D5F54]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-[#3D5F54]">
            Copyright © Puros Mates 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
