<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './views/ShopPage.jsx';
import AdminPanel from './views/AdminPanel.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
=======
import { Routes, Route } from 'react-router-dom';
import ShopPage from './views/ShopPage.jsx'; 
import Carrito from './views/Carrito.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
>>>>>>> Stashed changes
  );
}

export default App;
