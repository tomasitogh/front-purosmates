import React from 'react';

function ProductModal({ product, onClose, onAddToCart }) {
    if (!product) {
        return null; // Si no hay producto, no renderizamos la modal
    }

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
                            <img src={product.imageUrl} alt={product.name} className="main-detail-image" />
                            {/* Miniaturas */}
                            <div className="thumbnail-gallery">
                                {/* Puedes mapear aquí imágenes adicionales si product.images existe */}
                                <img src={product.imageUrl} alt="Thumbnail 1" className="thumbnail-item active" />
                                {/* Ejemplo de otras miniaturas, puedes añadir más o usar un array en 'product' */}
                                <img src="/images/calabaza2.png" alt="Thumbnail 2" className="thumbnail-item" />
                                <img src="/images/calabaza3.png" alt="Thumbnail 3" className="thumbnail-item" />
                            </div>
                        </div>
                        <div className="product-info-section">
                            <h3 className="product-detail-name">{product.name}</h3>
                            <p className="product-detail-description">
                                Mate criollo calabaza pulido con base de cuero, cuero crudo cocido
                                {/* Puedes poner la descripción real de product aquí si existe: {product.description} */}
                            </p>
                            <p className="product-detail-price">${product.price.toLocaleString('es-AR')}</p> {/* Formato de moneda */}
                            
                            {/* Acciones del producto */}
                            <div className="product-actions">
                                <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                                    Agregar al Carrito
                                </button>
                                {/* Botón "Comprar Ahora" (opcional, si tiene una funcionalidad distinta) */}
                                {/* <button className="buy-now-btn">Comprar Ahora</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;