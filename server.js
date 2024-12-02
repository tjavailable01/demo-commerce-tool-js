// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5008;

// Set up Commercetools API connection
const CTP_PROJECT_KEY = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY;
const CTP_API_URL = `https://api.us-central1.gcp.commercetools.com/${CTP_PROJECT_KEY}`;
const CTP_CLIENT_ID = process.env.NEXT_PUBLIC_CTP_CLIENT_ID;
const CTP_CLIENT_SECRET = process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET;

const fetchProducts = async () => {
  try {
    const authResponse = await axios.post(
      `https://auth.commercetools.com/oauth/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CTP_CLIENT_ID,
        client_secret: CTP_CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = authResponse.data.access_token;

    const response = await axios.get(`${CTP_API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching products from CommerceTools:", err);
    throw err;
  }
};

// Define API endpoint
app.get('/api/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
