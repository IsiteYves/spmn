const {
  deleteRestuarant,
  updateRestaurant,
  getSingleRestaurant,
  createRestaurant,
  getAllRestaurants,
} = require("../controllers/resto.controller");
const { checkAuth } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  router.route("/").post(checkAuth, createRestaurant).get(getAllRestaurants);
  router
    .route("/:restaurantId")
    .delete(checkAuth, deleteRestuarant)
    .put(checkAuth, updateRestaurant)
    .get(getSingleRestaurant);

  app.use("/api/resto", router);
};
