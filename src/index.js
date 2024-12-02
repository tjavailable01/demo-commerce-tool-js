import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { CartProvider } from './context/CartContext';

// React 18 uses createRoot
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <I18nextProvider i18n={i18n}>
    <CartProvider> {/* Wrap the app with CartProvider */}
      <Router>
        <AppRouter />
      </Router>
    </CartProvider>
  </I18nextProvider>
);
