import React, { useState, useEffect } from 'react';
import FilterTabs from '../components/FilterTabs';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal'; // ⬅️ Importamos la nueva modal

// Datos simulados (¡Perfecto, ya tienen 'type' para filtrar!)
const initialMates = [
    { id: 1, name: "Criollo con base de cuero", price: 15000, type: "Mates", imageUrl: "/images/calabaza1.png" },
    { id: 2, name: "Madera Mate", price: 30, type: "Mates", imageUrl: "/images/madera1.png" },
    { id: 3, name: "Silicona Mate", price: 20, type: "Mates", imageUrl: "/images/silicona1.png" },
    { id: 4, name: "Cerámica Mate", price: 35, type: "Mates", imageUrl: "/images/ceramica1.png" },
    { id: 5, name: "Bombilla de acero", price: 20, type: "Bombillas", imageUrl: "/images/bombilla1.png" },
    { id: 6, name: "Matera", price: 40, type: "Accesorios", imageUrl: "/images/matera1.png" },
    { id: 7, name: "Mate de algarrobo", price: 12000, type: "Mates", imageUrl: "/images/algarrobo.png" },
    { id: 8, name: "Mate de madera y metal", price: 18000, type: "Mates", imageUrl: "/images/maderametal.png" },
];

function ShopPage() {
    const [allMates, setAllMates] = useState(initialMates);
    const [filteredMates, setFilteredMates] = useState(initialMates);
    const [selectedType, setSelectedType] = useState('All');

    // ⬅️ NUEVOS ESTADOS PARA LA MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleFilterChange = (type) => {
        if (selectedType === type) {
            setSelectedType('All');
        } else {
            setSelectedType(type);
        }
    };

    useEffect(() => {
        if (selectedType === 'All') {
            setFilteredMates(allMates);
        } else {
            const newFilteredMates = allMates.filter(mate => mate.type === selectedType);
            setFilteredMates(newFilteredMates);
        }
    }, [selectedType, allMates]);

    // ⬅️ FUNCIÓN PARA ABRIR LA MODAL
    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // ⬅️ FUNCIÓN PARA CERRAR LA MODAL
    const closeProductModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null); // Limpiamos el producto seleccionado
    };

    // ⬅️ FUNCIÓN PARA AGREGAR AL CARRITO (por ahora, solo un console.log)
    const handleAddToCart = (product) => {
        console.log(`Producto "${product.name}" agregado al carrito!`);
        // Aquí iría la lógica real para añadir al carrito (con context API o Redux)
        closeProductModal(); // Cierra la modal después de añadir
    };

    return (
        <div className="shop-page-container">
            <div className="shop-layout-centered">
                <div className="main-content">
                    <h1 className="main-title-centered">Productos</h1> 
                    <FilterTabs 
                        selectedType={selectedType}
                        onFilterChange={handleFilterChange}
                    />
                    {/* ⬅️ PASAMOS LA FUNCIÓN openProductModal AL ProductGrid */}
                    <ProductGrid 
                        mates={filteredMates} 
                        onProductClick={openProductModal} 
                    />
                </div>
            </div>

            {/* ⬅️ RENDERIZAMOS LA MODAL SOLO SI isModalOpen ES TRUE */}
            {isModalOpen && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={closeProductModal} 
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}

export default ShopPage;