import { apiRoot } from './client';

export const addToCart = async (variantId, quantity) => {
    // Assume cartId and cartVersion are stored in local storage or state
    const cartId = localStorage.getItem('cartId');
    const cartVersion = localStorage.getItem('cartVersion');
    
    const response = await apiRoot.carts().withId({ ID: cartId }).post({
        body: {
            version: Number(cartVersion),
            actions: [{
                action: 'addLineItem',
                productId: variantId,
                quantity
            }]
        }
    }).execute();
    
    // Update cart version in local storage
    localStorage.setItem('cartVersion', response.body.version.toString());
};

export const removeFromCart = async (variantId) => {
    // Assume cartId and cartVersion are stored in local storage or state
    const cartId = localStorage.getItem('cartId');
    const cartVersion = localStorage.getItem('cartVersion');
    
    const response = await apiRoot.carts().withId({ ID: cartId }).post({
        body: {
            version: Number(cartVersion),
            actions: [{
                action: 'removeLineItem',
                lineItemId: variantId
            }]
        }
    }).execute();
    
    // Update cart version in local storage
    localStorage.setItem('cartVersion', response.body.version.toString());
};
