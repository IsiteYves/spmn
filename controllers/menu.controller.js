const {
    menuValidationSchema, Menu
} = require("../models/menu.model");
const { Restaurant } = require("../models/resto.model");

// Create a new menu item for a restaurant
exports.createMenuItem = async (req, res) => {
    try {
        const { error } = menuValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const restaurant = await Restaurant.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }


        const menu = new Menu(req.body);
        const result = await menu.save();

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get all menu items for a restaurant
exports.getAllMenuItemsForResto = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        const menus = await Menu.find({ restaurant: restaurant._id })
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get a single menu item for a restaurant
exports.getSingleMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const menuItem = await Menu.findById(req.params.menuId);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json(menuItem);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Update a menu item for a restaurant
exports.updateMenuItem = async (req, res) => {
    try {
        const { error } = menuValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const restaurant = await Restaurant.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const menuItem = await Menu.findById(req.params.menuId);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        menuItem.set(req.body);
        const result = await menuItem.save();

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Delete a menu item for a restaurant
exports.deleteMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const menuItem = await Menu.findById(req.params.menuId);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        await Menu.findOneAndDelete({
            _id: req.params.menuId,
            restaurant: restaurant._id,
        });

        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};


