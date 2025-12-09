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
  selectCartTotalPrice
} from "../redux/cartSlice";
import toast from 'react-hot-toast';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(selectCartOpen);
  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectCartTotalQty);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleClose = () => dispatch(setCartOpen(false));

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
              onClick={() => toast('Checkout pendiente de integrar con el back')}>
              Comprar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

