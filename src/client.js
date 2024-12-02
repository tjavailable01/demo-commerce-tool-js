// client.js

/*const { createClient, createHttpClient, createAuthForClientCredentialsFlow } = require('@commercetools/sdk-client-v2');
const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk');
const fetch = require("node-fetch");

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const ctpAuthUrl = process.env.REACT_APP_CTP_AUTH_URL;
const ctpApiUrl = process.env.REACT_APP_CTP_API_URL;

console.log("CTP Project Key:", projectKey);
console.log("CTP API URL:", ctpApiUrl); // Log the CTP API URL to verify it's the correct one

const getClient = () => {
  console.log("Reached client");
  console.log("CTP_AUTH_URL:", ctpAuthUrl); // Log the CTP Auth URL
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: ctpAuthUrl,  // Use the correct Auth URL
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CTP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: ctpApiUrl, // Use the correct API URL (should be US Central in your case)
    fetch,
  });

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });

  return client;
};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient());
module.exports.projectKey = projectKey;*/

/*
const { createClient, createHttpClient, createAuthForClientCredentialsFlow, ClientBuilder } = require('@commercetools/sdk-client-v2');
const { createApiBuilderFromCtpClient, ApiRoot } = require('@commercetools/platform-sdk');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const { createAuthMiddlewareForPasswordFlow, createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth');
const fetch = require("node-fetch");

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const ctpAuthUrl = process.env.REACT_APP_CTP_AUTH_URL;
const ctpApiUrl = process.env.REACT_APP_CTP_API_URL;

console.log("CTP Project Key:", projectKey);
console.log("CTP API URL:", ctpApiUrl);

const getClient = () => {
  console.log("Reached client");
  console.log("CTP_AUTH_URL:", ctpAuthUrl); // Log the CTP Auth URL
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: ctpAuthUrl,
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CTP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
      user: {
        username: '',  // Will be filled in during login
        password: ''   // Will be filled in during login
      }
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: ctpApiUrl,
    fetch,
  });

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });

  return createApiBuilderFromCtpClient(client);
};

module.exports.apiRoot = getClient();
module.exports.projectKey = projectKey;*/

const { createClient, createHttpClient, createAuthForClientCredentialsFlow, ClientBuilder } = require('@commercetools/sdk-client-v2');
const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk');
const fetch = require('node-fetch');

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const ctpAuthUrl = process.env.REACT_APP_CTP_AUTH_URL;
const ctpApiUrl = process.env.REACT_APP_CTP_API_URL;

console.log("CTP Project Key:", projectKey);
console.log("CTP API URL:", ctpApiUrl);

const getClient = () => {
  console.log("Reached client");
  console.log("CTP_AUTH_URL:", ctpAuthUrl); // Log the CTP Auth URL
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: ctpAuthUrl,
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CTP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: ctpApiUrl,
    fetch,
  });

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });

  return createApiBuilderFromCtpClient(client);
};

module.exports.apiRoot = getClient();
module.exports.projectKey = projectKey;
