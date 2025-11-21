import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import FilterTabs from '../components/FilterTabs';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import AuthModal from '../components/AuthModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Mock data para demostración cuando el backend no está disponible
const mockProducts = [
    {
        _id: '1',
        name: 'Mate Imperial Premium',
        price: 15000,
        description: 'Mate de calabaza premium con virola de alpaca',
        stock: 10,
        images: ['https://via.placeholder.com/300x300?text=Mate+Premium'],
        category: { description: 'Mate' }
    },
    {
        _id: '2',
        name: 'Bombilla Acero Inoxidable',
        price: 3500,
        description: 'Bombilla de acero inoxidable con filtro',
        stock: 25,
        images: ['https://via.placeholder.com/300x300?text=Bombilla'],
        category: { description: 'Bombilla' }
    },
    {
        _id: '3',
        name: 'Mate Uruguayo Tradicional',
        price: 12000,
        description: 'Mate tradicional uruguayo de calabaza',
        stock: 8,
        images: ['https://via.placeholder.com/300x300?text=Mate+Uruguayo'],
        category: { description: 'Mate' }
    },
    {
        _id: '4',
        name: 'Yerbera de Cuero',
        price: 8000,
        description: 'Yerbera artesanal de cuero genuino',
        stock: 15,
        images: ['https://via.placeholder.com/300x300?text=Yerbera'],
        category: { description: 'Accesorio' }
    },
    {
        _id: '5',
        name: 'Mate Camionero',
        price: 18000,
        description: 'Mate camionero con virola de alpaca',
        stock: 5,
        images: ['https://via.placeholder.com/300x300?text=Mate+Camionero'],
        category: { description: 'Mate' }
    },
];

function ShopPage() {
    const [allMates, setAllMates] = useState([]);
    const [filteredMates, setFilteredMates] = useState([]);
    const [selectedType, setSelectedType] = useState('All');
    const [sortBy, setSortBy] = useState('name-asc'); // New state for sorting
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
                // Usar datos mock cuando el backend no está disponible
                setAllMates(mockProducts);
                setError(null); // Clear error to show mock data
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

    // 🔎 aplicar filtros: categoría (tabs) + nombre (q) + ordenamiento
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

        // 3) Ordenamiento
        const sorted = [...list].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return (a.price || 0) - (b.price || 0);
                case 'price-desc':
                    return (b.price || 0) - (a.price || 0);
                case 'name-desc':
                    return (b.name || '').localeCompare(a.name || '');
                case 'name-asc':
                default:
                    return (a.name || '').localeCompare(b.name || '');
            }
        });

        setFilteredMates(sorted);
    }, [selectedType, allMates, searchText, sortBy]);

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
                    
                    {/* Filter and Sort Controls */}
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <FilterTabs 
                            selectedType={selectedType}
                            onFilterChange={handleFilterChange}
                        />
                        
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort-select" className="text-gray-700 font-medium whitespace-nowrap">
                                Ordenar por:
                            </label>
                            <select
                                id="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d5d52] bg-white"
                            >
                                <option value="name-asc">Nombre (A-Z)</option>
                                <option value="name-desc">Nombre (Z-A)</option>
                                <option value="price-asc">Precio (Menor a Mayor)</option>
                                <option value="price-desc">Precio (Mayor a Menor)</option>
                            </select>
                        </div>
                    </div>
                    
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
