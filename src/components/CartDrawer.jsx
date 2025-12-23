import { useDispatch, useSelector } from "react-redux";
import {
  setCartOpen,
  addToCart,
  decrementItem,
  removeItem,
  clearCart,
  selectCartOpen,
  selectCartItems,
  selectCartTotalQty,
  selectCartTotalPrice,
  createOrder,
  createPreference
} from "../redux/cartSlice";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PaymentMethodModal from './PaymentMethodModal';
import AuthModal from './AuthModal';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(selectCartOpen);
  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectCartTotalQty);
  const totalPrice = useSelector(selectCartTotalPrice);

  const { token, isAuthenticated } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleClose = () => dispatch(setCartOpen(false));

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSelection = async (method) => {
    setIsPaymentModalOpen(false);

    try {
      const resultAction = await dispatch(createOrder({ items, token }));

      if (createOrder.fulfilled.match(resultAction)) {
        const order = resultAction.payload;

        if (method === 'cash') {
          // WhatsApp Logic
          const phoneNumber = '5491130548207';
          const message = `Hola, tengo la orden #${order.id} y quiero pagar en efectivo.`;
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

          window.open(whatsappUrl, '_blank');
          toast.success('Orden creada. Redirigiendo a WhatsApp...');
          handleClose(); // Cerrar carrito
        } else {
          // Mercado Pago Logic
          toast.loading('Generando pago...');
          const prefResult = await dispatch(createPreference({ orderId: order.id, token }));

          if (createPreference.fulfilled.match(prefResult)) {
            const initPoint = prefResult.payload; // El backend ahora devuelve la URL directa
            window.location.href = initPoint;
          } else {
            toast.error('Error al generar pago con Mercado Pago');
          }
        }
      } else {
        toast.error('Error al crear la orden: ' + (resultAction.payload || 'Error desconocido'));
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
      console.error(error);
    }
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />}
      <aside className={`fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white z-50 shadow-2xl transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Tu carrito ({totalQty})</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-black">✕</button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Todavía no agregaste productos.</p>
          ) : items.map(it => (
            <div key={it.id} className="flex gap-3 border rounded-xl p-3">
              {it.imageUrls && it.imageUrls.length > 0 ? (
                <img
                  src={it.imageUrls[0]}
                  alt={it.name}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Sin imagen</text></svg>';
                  }}
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  Sin img
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">${it.price} c/u</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => dispatch(decrementItem(it.id))} className="px-2 rounded border">-</button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button onClick={() => dispatch(addToCart(it))} className="px-2 rounded border">+</button>
                  <button onClick={() => dispatch(removeItem(it.id))} className="ml-auto text-red-600 text-sm hover:underline">Quitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => dispatch(clearCart())} className="flex-1 border rounded-lg py-2">Vaciar</button>
            <button className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700"
              onClick={handleCheckoutClick}>
              Comprar
            </button>
          </div>
        </div>
      </aside>

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelectMethod={handlePaymentSelection}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

