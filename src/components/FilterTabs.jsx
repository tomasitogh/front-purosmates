import React from 'react';

const CATEGORIES = ['Mate', 'Bombilla', 'Accesorio'];

function FilterTabs({ selectedType, onFilterChange }) {
    return (
        <div className="filter-tabs-container">
            <p className="filter-label">Filtrar por:</p>
            <div className="filter-tabs">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        className={`filter-tab-button ${selectedType === category ? 'active' : ''}`}
                        onClick={() => onFilterChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterTabs;