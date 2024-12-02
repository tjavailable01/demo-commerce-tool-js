/*
import React, { useState } from 'react';
import { login } from '../../authService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            setError(null);
            // Redirect to the home page or dashboard
            window.location.href = '/';
        } catch (e) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
*/
import React, { useEffect,useState } from 'react';
import { loginCustomer, makeAuthenticatedRequest } from '../../authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogin = async () => {
      const authToken = localStorage.getItem('authToken');
      console.log("Reached Login Form");
      if (authToken) {
        console.log("Logout 3", localStorage.getItem('authToken'));
        //router.push('./products');
        navigate('/products');
      }
    };
    fetchLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await loginCustomer(email, password);
      console.log('Access token:', accessToken);
      const getUserDetails = await makeAuthenticatedRequest(accessToken);
      console.log('User details:', getUserDetails);
      localStorage.setItem('authToken', accessToken);
      console.log('User details 1:', getUserDetails);
      localStorage.setItem('customerId', getUserDetails.id);
      navigate('/products');
      //router.push('/products');
      console.log('User details 2:', getUserDetails);
    } catch (error) {
      console.log('Error:', error);
      setError('Login failed, please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

