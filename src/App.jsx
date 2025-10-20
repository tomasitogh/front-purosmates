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
  );
}

export default App;
