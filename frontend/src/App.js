import { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Header from './Header';
import Footer from './Footer';
// import ShoppingCart from './ShoppingCart';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/dresses');
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ProductList products={products} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail addToCart={(product) => setCart([...cart, product])}/>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </Fragment>
  );
}
