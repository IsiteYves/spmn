const {
  createMenuItem,
  getAllMenuItemsForResto,
  getSingleMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menu.controller");
const { checkAuth } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  router.route("/").post(checkAuth, createMenuItem);
  router.route("/:menuId").put(checkAuth, updateMenuItem);
  router.route("/all/:restaurantId").get(getAllMenuItemsForResto);
  router
    .route("/:restaurantId/:menuId")
    .delete(checkAuth, deleteMenuItem)
    .get(getSingleMenuItem);

  app.use("/api/menus", router);
};
