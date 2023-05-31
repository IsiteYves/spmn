
const {
    createRestoOrder,
    updateRestoOrder,
    updateRestoOrderStatus,
    getRestoOrders,
    getSingleRestoOrder,
    deleteRestoOrder
} = require("../controllers/order.controllers");


module.exports = (app) => {
    var router = require("express").Router();

    router.route("/")
        .post(createRestoOrder)
    router.route("/:orderId")
        .put(updateRestoOrder)
    router.route("/all/:restaurantId")
        .get(getRestoOrders)
    router.route("/:restaurantId/:orderId")
        .get(getSingleRestoOrder)
        .delete(deleteRestoOrder)
    router.route('/:restaurantId/:orderId/status')
        .put(updateRestoOrderStatus)


    app.use("/api/orders", router);
};


