const {
  updateRestoTable,
  createRestoTable,
  deleteRestoTable,
  getAllRestoTables,
  getSingleRestoTable,
} = require("../controllers/table.controller");
const { checkAuth } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  router.route("/").post(checkAuth, createRestoTable);
  router.route("/:tableId").put(checkAuth, updateRestoTable);
  router.route("/all/:restaurantId").get(getAllRestoTables);
  router
    .route("/:restaurantId/:tableId")
    .delete(checkAuth, deleteRestoTable)
    .get(getSingleRestoTable);

  app.use("/api/tables", router);
};
