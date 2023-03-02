import { Link } from 'react-router-dom';
import styles from './ProductList.css';

function ProductList({ products }) {
  return (
    <div className={styles.product}>
      <h2>Product List</h2>
      <div className="image-container">
        {products.map((product) => (
          <div className="product-list" key={product.id}>
            <div className="product-item">
              <img src={product.imgSrc} alt={product.name} />
              <h3>{product.name}</h3>
              <h4>{product.price}</h4>
              <p>
                <Link to={`/product/${product.id}`}>
                  View Details
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
