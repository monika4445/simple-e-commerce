import { Fragment } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import AddToCartButton from "./AddToCartButton";    

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Fragment>
    <div className="product-detail">
      <img src={product.imgSrc} alt={product.name} />
      </div>
      <div className="product-detail-info">
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
          <p>{product.description}</p>
      </div>
      <AddToCartButton product={product} addToCart={addToCart}/>
      </Fragment>
  );
}

export default ProductDetail;
