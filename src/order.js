const { apiRoot, projectKey } = require("./client.js");

module.exports.createCart = (customerID) => {
  console.log("customerID",customerID);
  try {
    const data = apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
        customer: {
          id: customerID
        }
      }
    })
    .execute();
    return data;
  }
  catch (error) {
    console.log("ERROR --->", error);
  }
}

module.exports.createAnonymousCart = async() => {
  try {
    const data = await apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute();
    return data;
  }
  catch (error) {
    console.log("ERROR --->", error);
  }
}

module.exports.getAllCarts = async() => {
  try {
    const data = await apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .get()
    .execute();
    return data;
  }
  catch (error) {
    console.log("ERROR --->", error);
  }
}

module.exports.getCartById = async(customerID) => {
  console.log("customerID",customerID);
  try {
    const data = await apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .withCustomerId({ customerID })
    .get()
    .execute();
    return data;
  }
  catch (error) {
    console.log("ERROR --->", error);
  }
}

module.exports.updateCart = async(ID, version, actions) => {
  try {
    const data = await apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions
      }
    })
    .execute();
    return data;
  }
  catch (error) {
    console.log("ERROR --->", error);
  }
}