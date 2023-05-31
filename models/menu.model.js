const mongoose = require("mongoose");
const Joi = require('joi');

const menuSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Drink', 'Starter', 'Appetizer', 'Dessert', 'Main'],
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
        ref: "Restaurant"
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});


const Model = mongoose.model('Menu', menuSchema);
module.exports.Menu = Model;

// Define validation schema for menu data
module.exports.menuValidationSchema = Joi.object({
    category: Joi.string().valid('Drink', 'Starter', 'Appetizer', 'Dessert', 'Main').required(),
    restaurantId: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
});