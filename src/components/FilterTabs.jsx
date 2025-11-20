import React from 'react';

const CATEGORIES = ['mates', 'bombillas', 'accesorios'];

function FilterTabs({ selectedType, onFilterChange }) {
    const selectedCategories = Array.isArray(selectedType) ? selectedType : [];
    
    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            // Deseleccionar
            const newSelection = selectedCategories.filter(c => c !== category);
            onFilterChange(newSelection);
        } else {
            // Seleccionar
            onFilterChange([...selectedCategories, category]);
        }
    };

    return (
        <div className="filter-tabs-container">
            <p className="filter-label">Categorías</p>
            <div className="filter-tabs">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        className={`filter-tab-button ${selectedCategories.includes(category) ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterTabs;