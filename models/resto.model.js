const mongoose = require("mongoose");
const Joi = require('joi');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    completeName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    owner: {
        phoneNumber: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    type: {
        type: String,
        enum: ['restaurant', 'coffeeshop', 'pub', 'hotel', 'other'],
        required: true,
    },
    openingHours: {
        type: String,
        required: true,
    },
    closingHours: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
});

const Model = mongoose.model('Restaurant', restaurantSchema);
module.exports.restaurantSchema = restaurantSchema
module.exports.Restaurant = Model;

// Define validation schema for restaurant data
module.exports.restaurantValidationSchema = Joi.object({
    name: Joi.string().required(),
    completeName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    owner: Joi.object({
        phoneNumber: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
    }).required(),
    type: Joi.string().valid('restaurant', 'coffeeshop', 'pub', 'hotel', 'other').required(),
    openingHours: Joi.string().required(),
    closingHours: Joi.string().required(),
    logo: Joi.string().required(),
});