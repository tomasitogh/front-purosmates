import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
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

    // 👇 leer querystring (?q=...)
    const location = useLocation();
    const searchText = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return (params.get('q') || '').trim().toLowerCase();
    }, [location.search]);

    // Configuración de la API
    const API_URL = 'http://localhost:8080/products';

    // Fetch de productos desde el backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
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
        if (selectedType === type) setSelectedType('All');
        else setSelectedType(type);
    };

    // 🔎 aplicar filtros: categoría (tabs) + nombre (q)
    useEffect(() => {
        // 1) por categoría (tu lógica original)
        let list = selectedType === 'All'
            ? allMates
            : allMates.filter(mate => mate.category?.description === selectedType);

        // 2) por texto (nombre del producto)
        if (searchText) {
            list = list.filter(m =>
                (m.name || '').toLowerCase().includes(searchText)
            );
        }

        setFilteredMates(list);
    }, [selectedType, allMates, searchText]);

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeProductModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            closeProductModal();
            setIsAuthModalOpen(true);
            return;
        }

        const cartItem = {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            images: product.images || [product.imageUrl],
            category: product.category,
            stock: product.stock,
        };
        
        addToCart(cartItem);
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
