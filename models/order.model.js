const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  orderItems: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  status: {
    type: String,
    enum: ["Delivered", "Waiting", "Rejected"],
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports.Order = Order;

// Define validation schema for order data
module.exports.orderValidationSchema = Joi.object({
  userId: Joi.string().required(),
  tableId: Joi.string().required(),
  status: Joi.string().required(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        menuItemId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
  restaurantId: Joi.string().required(),
});
