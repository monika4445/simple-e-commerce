function ShoppingCart({ cart, setCart }) {
    const removeFromCart = (index) => {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    };
  
    const calculateTotal = () => {
      return cart.reduce((total, product) => {
        return total + product.price;
      }, 0);
    };
  
    return (
      <div>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product.name} - ${product.price}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <p>Total: ${calculateTotal()}</p>
      </div>
    );
  }
  
  export default ShoppingCart;
  