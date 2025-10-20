import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Carrito() {
  const { items, removeItem, addToCart, decQty, totalPrice, totalQty, subtotal, discount, hasComboDiscount } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
              <img
                src={item.images?.[0] || '/img/mate-default.jpg'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              
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
              
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>A calcular</span>
              </div>
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
            
            <button className="w-full bg-[#D4AF37] text-[#2d5d52] px-6 py-3 rounded-lg hover:bg-[#DAA520] transition font-semibold mb-3">
              Proceder al Pago
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
