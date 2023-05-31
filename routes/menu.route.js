const {
    createMenuItem,
    getAllMenuItemsForResto,
    getSingleMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menu.controller");


module.exports = (app) => {
    var router = require("express").Router();

    router.route("/")
        .post(createMenuItem)
    router.route("/:menuId")
        .put(updateMenuItem)
    router.route("/all/:restaurantId")
        .get(getAllMenuItemsForResto)
    router.route('/:restaurantId/:menuId')
        .delete(deleteMenuItem)
        .get(getSingleMenuItem)


    app.use("/api/menus", router);
};