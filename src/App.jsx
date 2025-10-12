import ShopPage from './views/ShopPage.jsx'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ShopPage />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
