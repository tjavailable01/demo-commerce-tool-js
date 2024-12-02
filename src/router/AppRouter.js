import React from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import Home from '../app/components/Home';
import ProductList from '../app/components/ProductList';
import ProductDetail from '../app/components/ProductDetail';
import Cart from '../app/components/Cart';
import LoginForm from '../app/components/LoginForm';

/*const AppRouter = () => {
  console.log("Reached Router");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};*/
function AppRouter() {
  return (
    <div className="App">
      <h1>CommerceTools Products</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}
/*function AppRouter() {
  return (
    <div className="App">
      <h1>CommerceTools Products</h1>
      <ProductList />
    </div>
  );
}*/

export default AppRouter;
