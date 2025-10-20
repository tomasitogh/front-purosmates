import { useState, useEffect } from 'react';
import FilterTabs from '../components/FilterTabs';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import AuthModal from '../components/AuthModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ShopPage() {
    const [allMates, setAllMates] = useState([]);
    const [filteredMates, setFilteredMates] = useState([]);
    const [selectedType, setSelectedType] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    // Configuración de la API
    const API_URL = 'http://localhost:8080/products';

    // Fetch de productos desde el backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                setError(null);

                // NO enviamos token para la vista pública de productos
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Productos recibidos:', data);
                setAllMates(data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

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
            const newFilteredMates = allMates.filter(mate => 
                mate.category.description.toLowerCase() === selectedType.toLowerCase() ||
                mate.category.name.toLowerCase() === selectedType.toLowerCase()
            );
            setFilteredMates(newFilteredMates);
        }
    }, [selectedType, allMates]);

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeProductModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        // Verificar si el usuario está autenticado
        if (!isAuthenticated) {
            closeProductModal();
            setIsAuthModalOpen(true);
            return;
        }

        // Transformar el producto al formato que espera el carrito
        const cartItem = {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            images: product.images || [product.imageUrl],
        };
        
        addToCart(cartItem);
        console.log(`Producto "${product.name}" agregado al carrito!`);
        closeProductModal();
    };

    if (loading) {
        return (
            <div className="shop-page-container">
                <div className="shop-layout-centered">
                    <div className="main-content">
                        <h1 className="main-title-centered">Cargando productos...</h1>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shop-page-container">
                <div className="shop-layout-centered">
                    <div className="main-content">
                        <h1 className="main-title-centered">Error al cargar productos</h1>
                        <p style={{textAlign: 'center', color: 'red'}}>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-page-container">
            <div className="shop-layout-centered">
                <div className="main-content">
                    <h1 className="main-title-centered">Productos</h1> 
                    <FilterTabs 
                        selectedType={selectedType}
                        onFilterChange={handleFilterChange}
                    />
                    <ProductGrid 
                        mates={filteredMates} 
                        onProductClick={openProductModal} 
                    />
                </div>
            </div>

            {isModalOpen && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={closeProductModal} 
                    onAddToCart={handleAddToCart}
                />
            )}

            {isAuthModalOpen && (
                <AuthModal 
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                />
            )}
        </div>
    );
}

export default ShopPage;