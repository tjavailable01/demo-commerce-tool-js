const { apiRoot, projectKey } = require("./client.js");

module.exports.getProducts = async (page,perPage) => {
    console.log("Reached Products");
    console.log("CTP_PROJECT_KEY:", projectKey);
    console.log("ApiRoot:", apiRoot);

    try {
        // Await the result of the .get() call
        const data = await apiRoot
            .withProjectKey({ projectKey })
            .products()
            .get({
                queryArgs: {
                    limit: perPage,
                    offset: (page - 1) * perPage
                }
            })
            .execute();
        return data.body;
    } catch (error) {
        console.log("ERROR --->", error);
    }
}

module.exports.getProductById = async (ID) => {
    try {
        // Await the result of the .get() call
        const data = await apiRoot
            .withProjectKey({ projectKey })
            .products()
            .withId({ ID })
            .get()
            .execute();
        return data.body;
    } catch (error) {
        console.log("ERROR --->", error);
    }
}