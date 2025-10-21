import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function PriceFilter({ minPrice, maxPrice, onPriceChange }) {
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const handleMinChange = (e) => {
        const newMin = parseInt(e.target.value);
        if (newMin <= priceRange[1]) {
            const newRange = [newMin, priceRange[1]];
            setPriceRange(newRange);
            onPriceChange(newRange);
        }
    };

    const handleMaxChange = (e) => {
        const newMax = parseInt(e.target.value);
        if (newMax >= priceRange[0]) {
            const newRange = [priceRange[0], newMax];
            setPriceRange(newRange);
            onPriceChange(newRange);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="price-filter-container">
            <button 
                className="price-filter-toggle"
                onClick={toggleDropdown}
            >
                <span className="filter-toggle-text">Filtrar por Precio</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isOpen && (
                <div className="price-filter-dropdown">
                    <div className="price-display">
                        <span className="price-value">{formatPrice(priceRange[0])}</span>
                        <span className="price-separator">-</span>
                        <span className="price-value">{formatPrice(priceRange[1])}</span>
                    </div>

                    <div className="slider-container">
                        {/* Barra de rango mínimo */}
                        <div className="slider-wrapper">
                            <label className="slider-label">Precio Mínimo</label>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[0]}
                                onChange={handleMinChange}
                                className="price-slider min-slider"
                                style={{
                                    background: `linear-gradient(to right, #2d5d52 0%, #2d5d52 ${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%, #ddd ${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%, #ddd 100%)`
                                }}
                            />
                        </div>

                        {/* Barra de rango máximo */}
                        <div className="slider-wrapper">
                            <label className="slider-label">Precio Máximo</label>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={handleMaxChange}
                                className="price-slider max-slider"
                                style={{
                                    background: `linear-gradient(to right, #2d5d52 0%, #2d5d52 ${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%, #ddd ${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%, #ddd 100%)`
                                }}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            setPriceRange([minPrice, maxPrice]);
                            onPriceChange([minPrice, maxPrice]);
                        }}
                        className="reset-filter-btn"
                    >
                        Restablecer
                    </button>
                </div>
            )}
        </div>
    );
}

export default PriceFilter;

