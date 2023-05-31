const {
    restaurantValidationSchema,
    Restaurant
} = require("../models/resto.model");

// CRUD operations

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const { error } = restaurantValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const restaurant = new Restaurant(req.body);
        await restaurant.save();

        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get a single restaurant by ID
exports.getSingleRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

//Update restaurant
exports.updateRestaurant = async (req, res) => {
    try {
        const { error } = restaurantValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.restaurantId,
            req.body,
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteRestuarant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};