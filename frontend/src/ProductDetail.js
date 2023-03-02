import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import AddToCartButton from "./AddToCartButton";

function ProductDetail({ addToCart }) {
const [product, setProduct] = useState(null);
const { id } = useParams();

useEffect(() => {
const fetchData = async () => {
const response = await fetch(`http://localhost:4000/dresses?id=${id}`);
const data = await response.json();
setProduct(data);
};
fetchData();
}, [id]);

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
