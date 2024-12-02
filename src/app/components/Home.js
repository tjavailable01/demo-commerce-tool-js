import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  //const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerId');
    navigate('/login');
  };

  useEffect(() => {
    const fetchHome = async () => {
      console.log("Reached home");
      console.log("Logout 1", localStorage.getItem('authToken'));
    };
    fetchHome();
  }, []);

  return (
    <div className="home-list">
      <div className="row">
        <h1>Welcome to Home Page</h1>
      </div>
      <div>
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p><a href="/login">Log In</a></p>
        )}
      </div>
    </div>
  );
};

export default Home;
