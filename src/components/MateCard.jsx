import React from 'react';

// Asegúrate de que MateCard reciba onProductClick
function MateCard({ mate, onProductClick }) {
    return (
        // Añadimos el onClick al div principal
        <div className="mate-card" onClick={() => onProductClick(mate)}> 
            <div className="mate-image-container">
                {mate.imageUrls && mate.imageUrls.length > 0 ? (
                    <img 
                        src={mate.imageUrls[0]} 
                        alt={mate.name} 
                        className="mate-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Sin imagen</text></svg>';
                        }}
                    />
                ) : (
                    <div className="mate-image flex items-center justify-center bg-gray-200 text-gray-400">
                        Sin imagen
                    </div>
                )}
            </div>
            <div className="mate-info">
                <h3 className="mate-name">{mate.name}</h3>
                <p className="mate-price">${mate.price.toLocaleString('es-AR')}</p>
            </div>
        </div>
    );
}

export default MateCard;