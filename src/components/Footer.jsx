export default function Footer() {
  return (
    <footer className="bg-[#E8DCC4] text-[#3D5F54]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Desktop Layout - 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-12 items-start">
          {/* Logo Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <a href="./index.html">
                <img 
                  src="./img/favicon.ico" 
                  alt="Puros Mates Logo" 
                  className="h-20 w-20"
                />
              </a>
            </div>
            <a 
              href="./index.html" 
              className="text-2xl font-bold text-[#3D5F54] hover:opacity-80 transition"
            >
              PUROS MATES
            </a>
          </div>

          {/* Products Column */}
          <div>
            <a href="./catalogo.html">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-6 hover:opacity-80 transition">
                Productos
              </h3>
            </a>
            <ul className="space-y-3 text-lg">
              <li>
                <a 
                  href="./catalogo.html#mate" 
                  className="hover:opacity-70 transition"
                >
                  Mates
                </a>
              </li>
              <li>
                <a 
                  href="./catalogo.html#bombilla" 
                  className="hover:opacity-70 transition"
                >
                  Bombillas
                </a>
              </li>
              <li>
                <a 
                  href="./catalogo.html#accesorio" 
                  className="hover:opacity-70 transition"
                >
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <a href="./index.html">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-6 hover:opacity-80 transition">
                Puros Mates
              </h3>
            </a>
            <ul className="space-y-3 text-lg">
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
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.instagram.com/puros.mates/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="bg-white rounded-full p-3 hover:opacity-80 transition shadow-md"
              >
                <img 
                  src="./img/logo-instagram.webp" 
                  alt="Instagram" 
                  className="h-8 w-8"
                />
              </a>
              <a 
                href="https://wa.me/5491130548207" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="bg-white rounded-full p-3 hover:opacity-80 transition shadow-md"
              >
                <img 
                  src="./img/logo-wpp.webp" 
                  alt="WhatsApp" 
                  className="h-8 w-8"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Centered */}
        <div className="md:hidden flex flex-col items-center text-center space-y-10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <a href="./index.html" className="mb-4">
              <img 
                src="./img/favicon.ico" 
                alt="Puros Mates Logo" 
                className="h-32 w-32"
              />
            </a>
            <a 
              href="./index.html" 
              className="text-3xl font-bold text-[#3D5F54] hover:opacity-80 transition"
            >
              PUROS MATES
            </a>
          </div>

          {/* Products */}
          <div>
            <a href="./catalogo.html">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-4 hover:opacity-80 transition">
                Productos
              </h3>
            </a>
            <ul className="space-y-2 text-lg">
              <li>
                <a 
                  href="./catalogo.html#mate" 
                  className="hover:opacity-70 transition"
                >
                  Mates
                </a>
              </li>
              <li>
                <a 
                  href="./catalogo.html#bombilla" 
                  className="hover:opacity-70 transition"
                >
                  Bombillas
                </a>
              </li>
              <li>
                <a 
                  href="./catalogo.html#accesorio" 
                  className="hover:opacity-70 transition"
                >
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <a href="./index.html">
              <h3 className="text-[#3D5F54] text-2xl font-bold mb-4 hover:opacity-80 transition">
                Puros Mates
              </h3>
            </a>
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
                className="bg-white rounded-full p-4 hover:opacity-80 transition shadow-md"
              >
                <img 
                  src="./img/logo-instagram.webp" 
                  alt="Instagram" 
                  className="h-10 w-10"
                />
              </a>
              <a 
                href="https://wa.me/5491130548207" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="bg-white rounded-full p-4 hover:opacity-80 transition shadow-md"
              >
                <img 
                  src="./img/logo-wpp.webp" 
                  alt="WhatsApp" 
                  className="h-10 w-10"
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