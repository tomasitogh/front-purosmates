import ShopPage from './views/ShopPage.jsx'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./views/Register";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ShopPage />
        <Register />
      </main>
      
      <Footer />
    </div>
  );
}


export default App;
