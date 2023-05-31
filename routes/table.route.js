const { updateRestoTable, createRestoTable, deleteRestoTable, getAllRestoTables, getSingleRestoTable } = require("../controllers/table.controller");

module.exports = (app) => {
    var router = require("express").Router();

    router.route("/")
        .post(createRestoTable)
    router.route("/:tableId")
        .put(updateRestoTable)
    router.route("/all/:restaurantId")
        .get(getAllRestoTables)
    router.route('/:restaurantId/:tableId')
        .delete(deleteRestoTable)
        .get(getSingleRestoTable)


    app.use("/api/tables", router);
};