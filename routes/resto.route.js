const {
    deleteRestuarant,
    updateRestaurant,
    getSingleRestaurant,
    createRestaurant,
    getAllRestaurants,
} = require("../controllers/resto.controller");


// const {
//     auth
// } = require("../middlewares/auth.middleware");

module.exports = (app) => {

    var router = require("express").Router();

    router.route("/")
        .post(createRestaurant)
        .get(getAllRestaurants)
    router.route('/:restaurantId')
        .delete(deleteRestuarant)
        .put(updateRestaurant)
        .get(getSingleRestaurant)

    app.use("/api/resto", router);
};