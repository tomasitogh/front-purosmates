import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';
import { fetchCategories } from '../redux/categorySlice';
import { createProduct, updateProduct, deleteProduct, clearAdminMessages } from '../redux/adminSlice';
import FilterTabs from '../components/FilterTabs';
import ImageUploader from '../components/ImageUploader';

function AdminPanel() {
  const { user, token, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { items: products, loading: productsLoading } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);
  const { loading: adminLoading, error: adminError, successMessage } = useSelector((state) => state.admin);
  
  // Local state
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para el formulario de producto
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    imageUrls: [],
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    } else {
      dispatch(fetchProducts());
      dispatch(fetchCategories(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category?.description === selectedType
      );
      setFilteredProducts(filtered);
    }
  }, [selectedType, products]);

  // Mostrar mensajes de éxito/error
  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearAdminMessages());
    }
    if (adminError) {
      alert(`Error: ${adminError}`);
      dispatch(clearAdminMessages());
    }
  }, [successMessage, adminError, dispatch]);

  const handleFilterChange = (type) => {
    setSelectedType(type);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openCreateModal = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      imageUrls: [],
    });
    setSelectedProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.category?.id || '',
      imageUrls: product.imageUrls || [],
    });
    setSelectedProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que haya al menos una imagen
    if (!formData.imageUrls || formData.imageUrls.length === 0) {
      alert('Debes subir al menos una imagen del producto');
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: {
        id: parseInt(formData.categoryId),
      },
      imageUrls: formData.imageUrls,
    };

    try {
      if (isEditing) {
        await dispatch(updateProduct({ 
          productId: selectedProduct.id, 
          productData, 
          token 
        })).unwrap();
      } else {
        await dispatch(createProduct({ productData, token })).unwrap();
      }
      
      dispatch(fetchProducts());
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await dispatch(deleteProduct({ productId, token })).unwrap();
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
          <button
            onClick={openCreateModal}
            className="bg-[#2d5d52] text-white px-6 py-2 rounded-lg hover:bg-[#2d5d52]/90 transition font-medium shadow-sm"
          >
            + Agregar Producto
          </button>
        </div>

        {/* Filtros */}
        <FilterTabs
          selectedType={selectedType}
          onFilterChange={handleFilterChange}
        />

        {/* Grid de productos */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Sin imagen</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-bold">
                    ${product.price.toLocaleString('es-AR')}
                  </span>
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  Categoría: {product.category?.description || 'Sin categoría'}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition text-sm shadow-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition text-sm shadow-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay productos disponibles</p>
          </div>
        )}
      </main>

      {/* Modal para crear/editar producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5d52]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5d52]"
                    />
                  </div>

                  {/* Image Uploader */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imágenes del Producto *
                    </label>
                    <ImageUploader
                      images={formData.imageUrls}
                      onChange={(urls) => setFormData(prev => ({ ...prev, imageUrls: urls }))}
                      required={true}
                      token={token}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio *
                      </label>
                      <input
                        type="number"
                        name="price"
                        required
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5d52]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        required
                        min="0"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5d52]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      name="categoryId"
                      required
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5d52]"
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name || category.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    disabled={adminLoading}
                    className="flex-1 bg-[#2d5d52] text-white px-4 py-2 rounded-lg hover:bg-[#2d5d52]/90 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {adminLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')} Producto
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition shadow-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
