import './App.css';

import ItemListContainer from "./components/ItemListContainer"
import NavBar from "./components/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartProvider from './contexts/CartContext';
import Cart from "./components/Cart";
import Footer from './components/footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route index element={<ItemListContainer />} />
            <Route path="/category/:categoriaId" element={<ItemListContainer />} />
            <Route path="item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
