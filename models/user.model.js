const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       _id:
 *         type: string
 *       fullName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phone:
 *         type: string
 *     required:
 *       - fullName
 *       - email
 *       - password
 *       - phone
 */

var schema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['restoOwner', 'restoGuest', 'Admin'],
    required: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

// generate login token
schema.methods.generateAuthToken = function () {
  return jwt.sign({
    id: this._id,
  }, process.env.JWT_SECRET, {
    expiresIn: '5h'
  })
};

const Model = mongoose.model("User", schema);
module.exports.NationalIdPattern = /(?<!\d)\d{16}(?!\d)/;
module.exports.PhoneRegex = /(?<!\d)\d{10}(?!\d)/

module.exports.User = Model;
module.exports.validateUser = (body, isUpdating = false) => {
  return Joi.object({
    fullName: Joi.string().required(),
    role: Joi.string().valid('restoOwner', 'Admin', 'restoGuest').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(this.PhoneRegex).required(), // validate phone
    password: isUpdating ? Joi.string().min(6) : Joi.string().min(6).required(),
  }).validate(body);
};

module.exports.validateUserLogin = (body) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).validate(body);
};