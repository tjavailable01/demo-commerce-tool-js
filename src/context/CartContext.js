import React, { createContext, useState, useContext } from 'react';
import { createCart, getAllCarts, updateCart, getCartById } from "../order.js";

// Create a Cart Context
const CartContext = createContext();
const customerKey = "johnDoe";
//const customerID = "606e5e64-9bd1-4c9c-8bc5-093a6e9d35a8";


// Create a provider to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load the cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    console.log("savedCart");
    console.log(JSON.parse(savedCart));
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to add product to cart
  const addToCart = async(product) => {
    const authToken = localStorage.getItem('authToken');
    console.log("Reached Login Form");
    const customerID = localStorage.getItem('customerId');
    console.log('Customer ID is : ', customerID);

    const carts = await getCartById(customerID);
    console.log("carts", carts);
    if (carts) {
      const cartId = carts.results[0].id;
      const cartVersion = carts.results[0].version;
      console.log("cartId 2", cartId);
      console.log("cartVersion 2", cartVersion);
      const actions = [{
        "action": "addLineItem",
        "productId": product.id,
        "variantId": product.masterData.current.masterVariant.id,
        "quantity": 1
      }
      ];
      const cartResponse = await updateCart(cartId, cartVersion, actions);
      console.log("cartResponse 2", cartResponse);
    }
    else {
      const cartDetails = await createCart(customerID);
      console.log("cartDetails", cartDetails);
      const cartId = cartDetails.body.id;
      const cartVersion = cartDetails.body.version;
      console.log("cartId 1", cartId);
      console.log("cartVersion 1", cartVersion);
      const actions = [{
        "action": "addLineItem",
        "productId": product.id,
        "variantId": product.masterData.current.masterVariant.id,
        "quantity": 1
      }
      ];
      const cartResponse = await updateCart(cartId, cartVersion, actions);
      console.log("cartResponse 1", cartResponse);
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Function to remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => useContext(CartContext);
