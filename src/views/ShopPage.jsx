import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import FilterTabs from '../components/FilterTabs';
import PriceFilter from '../components/PriceFilter';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import AuthModal from '../components/AuthModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ShopPage() {
    // Redux
    const dispatch = useDispatch();
    const { items: allMates, loading, error } = useSelector((state) => state.products);
    
    // Local state para filtros y UI
    const [filteredMates, setFilteredMates] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    // 👇 leer querystring (?q=... y ?category=...)
    const location = useLocation();
    const searchText = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return (params.get('q') || '').trim().toLowerCase();
    }, [location.search]);

    const categoryFromUrl = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('category') || null;
    }, [location.search]);

    // Establecer la categoría desde la URL cuando cambie
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedType([categoryFromUrl]);
        }
    }, [categoryFromUrl]);

    // Fetch de productos usando Redux
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Calcular precios mínimo y máximo cuando se cargan los productos
    useEffect(() => {
        if (allMates.length > 0) {
            const prices = allMates.map(product => product.price);
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
        }
    }, [allMates]);

    const handleFilterChange = (categories) => {
        setSelectedType(categories);
    };

    const handlePriceChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
    };

    // 🔎 aplicar filtros: categoría (tabs) + nombre (q) + precio
    useEffect(() => {
        // 1) por categoría (múltiples selecciones)
        let list = selectedType.length === 0
            ? allMates
            : allMates.filter(mate => 
                selectedType.includes(mate.category?.description)
            );

        // 2) por texto (nombre del producto)
        if (searchText) {
            list = list.filter(m =>
                (m.name || '').toLowerCase().includes(searchText)
            );
        }

        // 3) por rango de precio
        list = list.filter(m => 
            m.price >= priceRange[0] && m.price <= priceRange[1]
        );

        setFilteredMates(list);
    }, [selectedType, allMates, searchText, priceRange]);

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
            imageUrls: product.imageUrls || product.images || [product.imageUrl],
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
            <div className="shop-layout-with-sidebar">
                <aside className="shop-sidebar">
                    <h3 className="sidebar-title">Filtros</h3>
                    <FilterTabs 
                        selectedType={selectedType}
                        onFilterChange={handleFilterChange}
                    />
                    <PriceFilter 
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onPriceChange={handlePriceChange}
                    />
                </aside>
                
                <div className="shop-main-content">
                    <h1 className="main-title-centered">Productos</h1> 
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