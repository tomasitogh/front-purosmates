import ShopPage from './views/ShopPage.jsx'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <ShopPage />
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
