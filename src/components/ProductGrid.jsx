import React from 'react';
import MateCard from './MateCard';

// Asegúrate de que ProductGrid reciba onProductClick
function ProductGrid({ mates, onProductClick }) { 
    return (
        <div className="product-grid">
            {mates.map(mate => (
                <MateCard 
                    key={mate.id} 
                    mate={mate} 
                    // Pasa onProductClick a cada MateCard
                    onProductClick={onProductClick} 
                />
            ))}
        </div>
    );
}

export default ProductGrid;