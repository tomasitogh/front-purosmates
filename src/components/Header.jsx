
import React from 'react';



function Header() {

        return (
        <header className="main-header">
        <div className="header-content">

        {/* 1. LOGO (Puros Mates) */}
        <div className="brand">
        {/* Reemplazamos el texto por una estructura de logo con acento verde */}
        <span className="logo-icon">▲</span>
        <span className="logo-text">Puros Mates</span>
        </div>
        {/* 2. NAVEGACIÓN (Links a Home, Shop, etc.) */}
        <nav className="main-nav">
        {/* Estos links no se ven en la referencia final, pero los dejamos por si los necesitas */}

        </nav>

        {/* 3. ACCIONES Y BOTONES */}
        <div className="header-actions">
        {/* Links de Productos y Carrito (como en la referencia) */}
        <a href="#" className="nav-link">Productos</a>
        <a href="#" className="nav-link">Carrito</a>
        {/* Botón de Comprar Ahora */}
        <button className="btn-primary">Comprar Ahora</button>
        </div>
        </div>
        </header>
);

}



export default Header;