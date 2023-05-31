const { Menu } = require("../models/menu.model");
const { Order, orderValidationSchema } = require("../models/order.model");
const { Restaurant } = require("../models/resto.model");
const { Table } = require("../models/table.model");

// Create a new order
exports.createRestoOrder = async (req, res) => {
    try {
        const { error } = orderValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const restaurant = await Restaurant.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Validate table ID
        const table = await Table.findById(req.body.tableId);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        // Validate menu item IDs in orderItems
        const menuItemsExist = await Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                const menuItem = await Menu.findById(orderItem.menuItemId);
                return !!menuItem;
            })
        );

        if (menuItemsExist.includes(false)) {
            return res.status(400).json({ error: 'One or more menu items do not exist' });
        }

        const order = new Order(req.body);
        await order.save();

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get all orders
exports.getRestoOrders = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const orders = await Order.find({ restaurantId: restaurant._id });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Get a single order
exports.getSingleRestoOrder = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Update an order
exports.updateRestoOrder = async (req, res) => {
    try {
        const { error } = orderValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const restaurant = await Restaurant.findById(req.body.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        // Validate table ID
        const table = await Table.findById(req.body.tableId);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }
        // Validate menu item IDs in orderItems
        const menuItemsExist = await Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                const menuItem = await Menu.findById(orderItem.menuItemId);
                return !!menuItem;
            })
        );

        if (menuItemsExist.includes(false)) {
            return res.status(400).json({ error: 'One or more menu items do not exist' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            req.body,
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Delete an order
exports.deleteRestoOrder = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await Menu.findOneAndDelete({
            _id: req.params.orderId,
            restaurant: restaurant._id,
        });

        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updateRestoOrderStatus = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
