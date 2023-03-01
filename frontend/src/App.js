import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
// import data from './utils';
import Header from './Header';
import Footer from './Footer';
import ShoppingCart from "./ShoppingCart";

export default function App() {
  const [products] = useState(data);// fetch from backend api
  const [cart, setCart] = useState([]);

  return ( 
    <Fragment>
        <Header />
          <Router>
            <Routes>
                <Route path="/" element={<ProductList products={products} />} />
                <Route path="/product/:id" 
                       element={<ProductDetail products={products} addToCart={(product) => setCart([...cart, product])} />} />
                <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />

            </Routes>
          </Router>
          <Footer />
    </Fragment>
  );
}

