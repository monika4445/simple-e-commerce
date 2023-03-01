import { Link } from 'react-router-dom';
import styles from "./ProductList.css";

function ProductList({ products, onItemClick  }) {
  return (
    <div className={styles.product}>
      <h2>Product List</h2>
      <div className="image-container">

        {products.map((product) => (
          <div className='product-list'>
          <div className='product-item' key={product.id}>
              <img src={product.imgSrc} alt={product.name} />
              <h3>{product.name}</h3>
              <h4>{product.price}</h4>
              <p>
                <Link to={`/product/${product.id}`}>
                    <button onClick={() => onItemClick(product)}>View Details</button>
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
