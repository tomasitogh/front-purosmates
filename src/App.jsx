import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ShopPage from './views/ShopPage.jsx';
import Carrito from './views/Carrito.jsx';
import AdminPanel from './views/AdminPanel.jsx';
import CheckoutSuccess from './views/CheckoutSuccess.jsx';
import CheckoutPending from './views/CheckoutPending.jsx';
import CheckoutFailure from './views/CheckoutFailure.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          {/* Checkout Routes */}
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/pending" element={<CheckoutPending />} />
          <Route path="/checkout/failure" element={<CheckoutFailure />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
