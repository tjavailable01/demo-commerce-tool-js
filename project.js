const { createClient } = require('@commercetools/sdk-client')
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
const { createApiBuilderFromCtpClient } = require("@commercetools/typescript-sdk");

const fetch = require('node-fetch')
require('dotenv').config()

console.log('Getting started with commercetools Typescript SDK');

const {
    CTP_CLIENT_ID,
    CTP_CLIENT_SECRET,
    CTP_PROJECT_KEY,
    CTP_AUTH_URL,
    CTP_API_URL,
    CTP_SCOPES
} = process.env;

const projectKey = 'alola'

// Create a httpMiddleware for the your project AUTH URL
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: CTP_AUTH_URL,
    projectKey,
    credentials: {
        clientId: CTP_CLIENT_ID,
        clientSecret: CTP_CLIENT_SECRET,
    },
    scopes: [CTP_SCOPES],
    fetch,
})

// Create a httpMiddleware for the your project API URL
const httpMiddleware = createHttpMiddleware({
    host: CTP_API_URL,
    fetch,
})

// Create a client using authMiddleware and httpMiddleware
const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
})

// Create a API root from API builder of commercetools platform client
const apiRoot = createApiBuilderFromCtpClient(client);

(async () => {
    try {
        await apiRoot.withProjectKey({projectKey}).get().execute()
            .then(data => {
                console.log('Project information --->', data);
            })
            .catch(error => {
                console.log('ERROR --->', error);
            })
    } catch (error) {
        console.log('ERROR --->', error);
    }
    console.log('Got project information');
})();