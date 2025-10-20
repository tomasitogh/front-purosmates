import React from 'react';

// Asegúrate de que MateCard reciba onProductClick
function MateCard({ mate, onProductClick }) {
    return (
        // Añadimos el onClick al div principal
        <div className="mate-card relative" onClick={() => onProductClick(mate)}> 
            {/* Indicador de sin stock */}
            {(!mate.stock || mate.stock <= 0) && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                    Sin stock
                </div>
            )}
            <div className="mate-image-container">
                {mate.imageUrls && mate.imageUrls.length > 0 ? (
                    <img 
                        src={mate.imageUrls[0]} 
                        alt={mate.name} 
                        className={`mate-image ${(!mate.stock || mate.stock <= 0) ? 'opacity-60' : ''}`}
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