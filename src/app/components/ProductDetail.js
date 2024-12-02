import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Import useCart hook
import { getProductById } from "../../product.js";
//import { getAllCarts, getCartById } from "../../order.js";
//import { addToCart, removeFromCart } from "../../cart.js"


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const customerId = localStorage.getItem('customerId');

  const { addToCart } = useCart(); // Destructure the addToCart function from context

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        //const carts = await getCartById(customId);
        //console.log("Carts :", carts);
        console.log("Customer ID --->", customerId);
        setProduct(response);
        console.log("Product details --->", response);
        setSelectedVariant(response.masterData.current.masterVariant);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (product) {
      // Add the product to the cart context
      addToCart(product);
    }
  };

  /*const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(selectedVariant.id, quantity);
    }
  };

  const handleRemoveFromCart = () => {
    if (selectedVariant) {
      removeFromCart(selectedVariant.id);
    }
  };*/

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  /*return (
    <div className="product-detail">
      <h2>{product.masterData.current.name.en}</h2>
      <img src={selectedVariant.images[0]?.url} alt={product.masterData.current.name.en} />
      <p>{(selectedVariant.prices[0].value.centAmount / 100).toFixed(selectedVariant.prices[0].value.fractionDigits)} {selectedVariant.prices[0].value.currencyCode}</p>
      <h3>Variants</h3>
      <select onChange={(e) => handleVariantChange(product.masterData.current.variants.find((v) => v.id === e.target.value))}>
        {product.masterData.current.variants.map((variant) => (
          <option key={variant.id} value={variant.id}>{variant.sku}</option>
        ))}
      </select>
      <div>
        <button onClick={handleRemoveFromCart}>Remove from Cart</button>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
    </div>
  );*/
  return (
    <div className="product-detail">
      <h2>{product.masterData.current.name.en}</h2>
      <img src={selectedVariant.images[0]?.url} alt={product.masterData.current.name.en} />
      <p>{(selectedVariant.prices[0].value.centAmount / 100).toFixed(selectedVariant.prices[0].value.fractionDigits)} {selectedVariant.prices[0].value.currencyCode}</p>
      <h3>Variants</h3>
      <select onChange={(e) => handleVariantChange(product.masterData.current.variants.find((v) => v.id === e.target.value))}>
        {product.masterData.current.variants.map((variant) => (
          <option key={variant.id} value={variant.id}>{variant.sku}</option>
        ))}
      </select>
      <div>
        {isLoggedIn ? (
          <div>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        ) : (
          <p>Please click on <a href="/login">log in</a> to add items to your cart.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
