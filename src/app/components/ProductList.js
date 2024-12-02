"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getProducts } from '../../product.js';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(page, perPage);
        console.log("Product details --->", response.results);
        console.log("Logout 2", localStorage.getItem('authToken'));
        setProducts(response.results);
        setTotal(response.total);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, perPage]);

  const handleNextPage = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerId');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  /*return (
    <div className="product-list">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.masterData.current.masterVariant.images[0]?.url} alt={product.masterData.current.name.en} />
                <h3>{product.masterData.current.name.en}</h3>
                <p>{(product.masterData.current.masterVariant.prices[0].value.centAmount / 100).toFixed(product.masterData.current.masterVariant.prices[0].value.fractionDigits)} {product.masterData.current.masterVariant.prices[0].value.currencyCode}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );*/
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td><Link to={`/product/${product.id}`}>{product.masterData.current.name.en}</Link></td>
              <td><img src={product.masterData.current.masterVariant.images[0]?.url} alt={product.masterData.current.name.en} /></td>
              <td>{(product.masterData.current.masterVariant.prices[0].value.centAmount / 100).toFixed(product.masterData.current.masterVariant.prices[0].value.fractionDigits)} {product.masterData.current.masterVariant.prices[0].value.currencyCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span> Page {page} </span>
        <button onClick={handleNextPage} disabled={page * perPage >= total}>Next</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProductList;
