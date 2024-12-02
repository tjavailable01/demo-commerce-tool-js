/*const { apiRoot } = require("./client.js");
const { TokenProvider } = require('@commercetools/sdk-middleware-auth');

const { createAuthMiddlewareForPasswordFlow } = require('@commercetools/sdk-middleware-auth');
const { ClientBuilder } = require('@commercetools/sdk-client-v2');
const fetch = require('node-fetch');

const login = async (email, password) => {
    console.log("Reached login");
    console.log("email", email);
    console.log("password", password);

    const client = new ClientBuilder()
        .withProjectKey(process.env.REACT_APP_CTP_PROJECT_KEY)
        .withMiddleware(
            createAuthMiddlewareForPasswordFlow({
                host: process.env.REACT_APP_CTP_AUTH_URL,
                projectKey: process.env.REACT_APP_CTP_PROJECT_KEY,
                credentials: {
                    clientId: process.env.REACT_APP_CTP_CLIENT_ID,
                    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
                    user: {
                        username: email,
                        password: password,
                    },
                },
                fetch,
            })
        )
        .withMiddleware(
            createHttpMiddleware({
                host: process.env.REACT_APP_CTP_API_URL,
                fetch,
            })
        )
        .build();

    try {
        const response = await client.execute({
            uri: `/login`,
            method: 'POST',
            body: {
                email,
                password,
            },
        });

        console.log("response", response);

        if (response.body.accessToken) {
            // Save token in local storage or state
            localStorage.setItem('authToken', response.body.accessToken);
            return response.body;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

module.exports = { login };*/

/*const axios = require('axios');
const { apiRoot } = require("./client.js");

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_CTP_AUTH_URL}/oauth/token`, null, {
            params: {
                grant_type: 'password',
                client_id: REACT_APP_CTP_CLIENT_ID,
                client_secret: REACT_APP_CTP_CLIENT_SECRET,
                username: email,
                password: password,
                scope: 'manage_customers' // Or other scopes depending on your needs
            }
        });
        if (response.data && response.data.access_token) {
            // Step 2: Save the access token (store it in localStorage, cookies, or session)
            localStorage.setItem('authToken', response.data.access_token);

            // Return the response containing the access token and other details
            console.log('Login successful, token:', response.data);
            return response.data;
        } else {
            throw new Error('Authentication failed. No access token received.');
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};*/
/*import {
  createClient,
  createHttpClient,
  createAuthForPasswordFlow,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const ctpAuthUrl = process.env.REACT_APP_CTP_AUTH_URL;
const ctpApiUrl = process.env.REACT_APP_CTP_API_URL;

const getClient = (email, password) => {
  return createClient({
    middlewares: [
      createAuthForPasswordFlow({
        host: ctpAuthUrl,
        projectKey: projectKey,
        credentials: {
          clientId: process.env.REACT_APP_CTP_CLIENT_ID,
          clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
          user: {
            username: email,
            password: password,
          },
        },
        fetch,
      }),
      createHttpClient({
        host: ctpApiUrl,
        fetch,
      }),
    ],
  });
};

export const loginUser = async (email, password) => {
  try {
    const client = getClient(email, password);
    const response = await client.execute({
      uri: `/${projectKey}/login`,
      method: 'POST',
      body: {
        email,
        password,
      },
    });
    return response.body;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};*/

/*import {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CTP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CTP_CLIENT_SECRET;
const authUrl = process.env.REACT_APP_CTP_AUTH_URL;
const apiUrl = process.env.REACT_APP_CTP_API_URL;

const authMiddleware = createAuthForClientCredentialsFlow({
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret
  },
  fetch
});

const httpMiddleware = createHttpClient({
  host: apiUrl,
  fetch
});

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware]
});

export const getAccessToken = async () => {
  try {
    const response = await authClient.execute({
      uri: '/oauth/token',
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    });
    return response.body.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await client.execute({
      uri: `/${projectKey}/login`,
      method: 'POST',
      body: {
        email,
        password,
      },
    });
    return response.body;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};*/

/*import {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const axios = require('axios');
const qs = require('qs');

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CTP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CTP_CLIENT_SECRET;
const authUrl = process.env.REACT_APP_CTP_AUTH_URL;
const apiUrl = process.env.REACT_APP_CTP_API_URL;
const scope = process.env.REACT_APP_CTP_SCOPES;

const authMiddleware = createAuthForClientCredentialsFlow({
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret
  },
  fetch
});

const httpMiddleware = createHttpClient({
  host: apiUrl,
  fetch
});

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware]
});

// Create a client to get OAuth token
const authClient = createClient({
  middlewares: [
    createAuthForClientCredentialsFlow({
      host: authUrl,
      projectKey,
      credentials:{
        clientId,
        clientSecret,
      },
      fetch,
    }),
    createHttpClient({
      host: apiUrl,
      fetch,
    }),
  ],
});

export const getAccessToken = async () => {
  try {
    const response = await authClient.execute({
      uri: '/oauth/token',
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    });
    console.log("response", response);
    return response.body.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

export const getAuthToken = async (email, password) => {
  try {
    const authData = {
      grant_type: 'client_credentials',
      scope: scope,
    }
    //const authString = Buffer.from(`${email}:${password}`).toString('base64');
    const authString = window.btoa(`${email}:${password}`);
    const headers = {
      Authorization: `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams(authData).toString();
    const response = await fetch(`${authUrl}/oauth/token`, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    console.log("response", response);
    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  }
  catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    // Get the access token first
    const accessToken = await getAccessToken();

    // Create a client to login the user
    const loginClient = createClient({
      middlewares: [
        createAuthForPasswordFlow({
          host: authUrl,
          projectKey,
          credentials: {
            username: email,
            password,
            clientId,
            clientSecret,
          },
          fetch,
        }),
        createHttpMiddleware({
          host: apiUrl,
          fetch,
        }),
      ],
    });

    const response = await loginClient.execute({
      uri: `/${projectKey}/login`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        email,
        password,
      },
    });

    return response.body;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};*/

import axios from 'axios'; // Import axios
import qs from 'qs';
import { encode } from 'js-base64';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CTP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CTP_CLIENT_SECRET;
const authUrl = process.env.REACT_APP_CTP_AUTH_URL;
const apiUrl = process.env.REACT_APP_CTP_API_URL;
const scope = process.env.REACT_APP_CTP_SCOPES;

export const loginCustomer = async (username, password) => {
  try {
    const authData = {
      grant_type: 'password',
      username: username,
      password: password,
      scope: scope,
    };

    const authString = encode(`${clientId}:${clientSecret}`);

    const headers = {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
      grant_type: 'password',
      scope: scope,
      username: username, 
      password: password,
    }).toString();
    
    const response = await fetch(`${authUrl}/oauth/${projectKey}/customers/token`, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    // Check if the response is ok (status 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }
    // Parse the JSON response
    const responseData = await response.json();
    // Log the access token (you can store it in localStorage or a global variable)
    console.log('Get Response Data:', responseData);
    console.log('Access Token:', responseData.access_token);
    return responseData.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const makeAuthenticatedRequest = async (token) => {
  try {
    const newApiUrl = `${apiUrl}/${projectKey}`; // Replace with your API URL

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const response = await axios.get(`${newApiUrl}/me`, {
      headers: headers,
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error.response ? error.response.data : error.message);
  }
};