"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProducts } = require("../../src/product.js");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("Product details --->", response.results);
        setProducts(response.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src="" alt={product.name} />
                <h3>{product.name}</h3>
                <p>3</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
