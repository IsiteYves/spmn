const { Restaurant } = require("../models/resto.model");
const { tableValidationSchema, Table } = require("../models/table.model");

// Create a new table for a restaurant
exports.createRestoTable = async (req, res) => {
    try {
        const { error } = tableValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const restaurant = await Restaurant.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const table = new Table(req.body);
        await table.save();

        res.json(table);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get all tables for a restaurant
exports.getAllRestoTables = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const tables = await Table.find({ restaurant: restaurant._id });
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get a single table for a restaurant
exports.getSingleRestoTable = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const table = await Table.findOne({
            _id: req.params.tableId,
            restaurant: restaurant._id,
        });
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        res.json(table);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Update a table for a restaurant
exports.updateRestoTable = async (req, res) => {
    try {
        const { error } = tableValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const restaurant = await Restaurant.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const table = await Table.findOneAndUpdate(
            { _id: req.params.tableId, restaurant: restaurant._id },
            req.body,
            { new: true }
        );
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        res.json(table);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Delete a table for a restaurant
exports.deleteRestoTable = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const table = await Table.findOneAndDelete({
            _id: req.params.tableId,
            restaurant: restaurant._id,
        });
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        res.json({ message: 'Table deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
