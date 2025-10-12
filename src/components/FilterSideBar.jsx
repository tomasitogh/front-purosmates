import React from 'react';

// 💥 CAMBIO CLAVE: Nueva lista de categorías
const PRODUCT_CATEGORIES = ['Mates', 'Bombillas', 'Accesorios'];

function FilterSidebar({ selectedType, onFilterChange }) {
    
    const handleClick = (category) => {
        // Llama a la función de cambio de filtro en ShopPage.jsx
        onFilterChange(category);
    };

    return (
        <div className="filter-sidebar">
            <h2>Filter All Mates</h2>
            
            <div className="filter-group">
                {/* 💥 CAMBIO DE ETIQUETA: Ahora filtramos por categoría */}
                <h3>Filter by Category</h3> 
                {PRODUCT_CATEGORIES.map((category) => (
                    <div 
                        key={category} 
                        className={`filter-item ${selectedType === category ? 'active' : ''}`}
                        onClick={() => handleClick(category)}
                    >
                        {category}
                        <span className="chevron"> &gt; </span> 
                    </div>
                ))}
                
                {/* Opción 'All Types' se convierte en 'All Products' o 'All Categories' */}
                <div 
                    className={`filter-item ${selectedType === 'All' ? 'active' : ''}`}
                    onClick={() => handleClick('All')}
                >
                    All Products
                </div>
            </div>
        </div>
    );
}

export default FilterSidebar;