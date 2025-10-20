import React, { useState } from 'react';

function ProductModal({ product, onClose, onAddToCart }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!product) {
        return null; // Si no hay producto, no renderizamos la modal
    }

    const images = product.imageUrls && product.imageUrls.length > 0 
        ? product.imageUrls 
        : ['data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23ddd" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Sin imagen</text></svg>'];

    return (
        // Contenedor principal de la modal (fondo oscuro y transparente)
        <div className="modal-overlay" onClick={onClose}>
            {/* Contenido de la modal, evita que el clic en el fondo la cierre */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Detalles del Producto</h2>
                    <button className="modal-close-button" onClick={onClose}>
                        &times; {/* Símbolo de "x" para cerrar */}
                    </button>
                </div>
                <div className="modal-body">
                    <div className="product-details-main">
                        <div className="product-image-section">
                            {/* Imagen principal del producto */}
                            <img 
                                src={images[selectedImageIndex]} 
                                alt={product.name} 
                                className="main-detail-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23ddd" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Error al cargar</text></svg>';
                                }}
                            />
                            {/* Miniaturas */}
                            {images.length > 1 && (
                                <div className="thumbnail-gallery">
                                    {images.map((image, index) => (
                                        <img 
                                            key={index}
                                            src={image} 
                                            alt={`${product.name} - ${index + 1}`} 
                                            className={`thumbnail-item ${selectedImageIndex === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImageIndex(index)}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/></svg>';
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="product-info-section">
                            <h3 className="product-detail-name">{product.name}</h3>
                            <p className="product-detail-description">
                                {product.description || 'Producto de calidad premium para disfrutar del mejor mate.'}
                            </p>
                            <p className="product-detail-price">${product.price.toLocaleString('es-AR')}</p>
                            
                            {/* Acciones del producto */}
                            <div className="product-actions">
                                <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;