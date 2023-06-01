const {
  createRestoOrder,
  updateRestoOrder,
  updateRestoOrderStatus,
  getRestoOrders,
  getSingleRestoOrder,
  deleteRestoOrder,
} = require("../controllers/order.controllers");
const { checkAuth } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  router.route("/").post(checkAuth, createRestoOrder);
  router.route("/:orderId").put(checkAuth, updateRestoOrder);
  router.route("/all/:restaurantId").get(getRestoOrders);
  router
    .route("/:restaurantId/:orderId")
    .get(getSingleRestoOrder)
    .delete(checkAuth, deleteRestoOrder);
  router
    .route("/:restaurantId/:orderId/status")
    .put(checkAuth, updateRestoOrderStatus);

  app.use("/api/orders", router);
};
