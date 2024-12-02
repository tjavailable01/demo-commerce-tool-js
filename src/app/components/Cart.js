import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // Remove product from cart
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <h3>{product.masterData.current.name.en}</h3>
              <p>{(product.masterData.current.masterVariant.prices[0].value.centAmount / 100).toFixed(product.masterData.current.masterVariant.prices[0].value.fractionDigits)} {product.masterData.current.masterVariant.prices[0].value.currencyCode}</p>
              <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
