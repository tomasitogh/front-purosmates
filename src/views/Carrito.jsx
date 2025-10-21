import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Carrito() {
  const { items, removeItem, addToCart, decQty, totalPrice, totalQty, subtotal, discount, hasComboDiscount, clearCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleConfirmarCompra = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para realizar la compra');
        navigate('/');
        return;
      }

      // Preparar los items en el formato que espera el backend
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.qty
      }));

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderItems)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error al procesar la compra');
      }

      const order = await response.json();
      
      // Mostrar mensaje de éxito
      setShowSuccess(true);
      
      // Limpiar el carrito y redirigir después de 3 segundos
      setTimeout(() => {
        clearCart();
        setShowSuccess(false);
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error('Error al confirmar compra:', error);
      alert(error.message || 'Error al procesar la compra. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Modal de compra exitosa (PRIMERO verificar esto)
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Compra Exitosa!</h2>
          <p className="text-gray-600 mb-4">Tu pedido ha sido procesado correctamente</p>
          <p className="text-sm text-gray-500">Serás redirigido a la tienda...</p>
        </div>
      </div>
    );
  }

  if (totalQty === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu Carrito</h1>
          <p className="text-gray-600 mb-8">Tu carrito está vacío</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#D4AF37] text-[#2d5d52] px-6 py-3 rounded-lg hover:bg-[#DAA520] transition font-semibold"
          >
            Ir a comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu Carrito</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
              {item.imageUrls && item.imageUrls.length > 0 ? (
                <img
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Sin imagen</text></svg>';
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  Sin imagen
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price?.toFixed(2)}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decQty(item.id)}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-medium px-4">{item.qty}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-800 transition text-sm mt-2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen del Pedido</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalQty} productos)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {hasComboDiscount && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>🎉 Descuento Combo (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            {hasComboDiscount && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800 font-medium">
                  ✅ ¡Combo completo! Tienes Mate + Bombilla + Accesorio
                </p>
              </div>
            )}
            
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleConfirmarCompra}
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#2d5d52] px-6 py-3 rounded-lg hover:bg-[#DAA520] transition font-semibold mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : 'Confirmar carrito'}
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
