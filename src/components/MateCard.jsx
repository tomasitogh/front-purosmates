import React from 'react';

// Asegúrate de que MateCard reciba onProductClick
function MateCard({ mate, onProductClick }) {
    return (
        // Añadimos el onClick al div principal
        <div className="mate-card" onClick={() => onProductClick(mate)}> 
            <div className="mate-image-container">
                <img src={mate.imageUrl} alt={mate.name} className="mate-image" />
            </div>
            <div className="mate-info">
                <h3 className="mate-name">{mate.name}</h3>
                <p className="mate-price">${mate.price.toLocaleString('es-AR')}</p>
            </div>
        </div>
    );
}

export default MateCard;