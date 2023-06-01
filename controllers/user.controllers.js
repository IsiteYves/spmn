const { compare } = require("bcryptjs");
const {
  validateUser,
  validateUserLogin,
  User,
} = require("../models/user.model");
const { hashPassword } = require("../utils/imports");

/***
 *  Create's a new user
 * @param req
 * @param res
 */
exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    let { email, phone, password, password2 } = req.body;

    let user = await User.findOne({
      $or: [
        {
          email,
        },
        {
          phone,
        },
      ],
    });

    if (user) {
      const phoneFound = phone == user.phone;
      const emailFound = email == user.email;
      return res.status(400).send({
        message: `User with same ${
          phoneFound ? "phone " : emailFound ? "email " : "nationalId "
        } already exist`,
      });
    }

    if (password !== password2) {
      return res.status(400).json({
        status: "ERROR",
        message: "Passwords do not match",
      });
    }

    req.body.password = await hashPassword(req.body.password);

    const newUser = new User(req.body);

    const result = await newUser.save();

    return res.status(201).send({
      message: "CREATED",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 * Find current user
 * @param req
 * @param res
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const result = await User.findOne({
      _id: req.user.id,
    });

    return res.status(201).send({
      message: "OK",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/**
 * Login User
 * @param req
 * @param res
 */
exports.loginUser = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.status(404).send({
        message: "Invalid login credentials",
      });

    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send({
        message: "Invalid login credentials",
      });
    }

    const token = await user.generateAuthToken();
    user.token = token;

    return res.status(200).send({
      message: "OK",
      token,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  updates's a new user
 * @param req
 * @param res
 */
exports.updateUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body, true);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    let { email, phone } = req.body;

    let duplicate_user = await User.findOne({
      _id: {
        $ne: req.params.id,
      },
      $or: [
        {
          email: email,
        },
        {
          phone: phone,
        },
      ],
    });

    if (duplicate_user) {
      const phoneFound = phone == duplicate_user.phone;
      const emailFound = email == duplicate_user.email;
      return res.status(400).send({
        message: `User with same ${
          phoneFound ? "phone " : emailFound ? "email " : "nationalId "
        } already exist`,
      });
    }

    req.body.password = await hashPassword(req.body.password);
    const result = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).send({
      message: "UPDATED",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  updates's a new user
 * @param req
 * @param res
 */
exports.deleteUser = async (req, res) => {
  try {
    const result = await User.findOneAndDelete({
      _id: req.params.id,
    });
    if (!result)
      return res.status(404).send({
        message: "User not found",
      });

    return res.send({
      message: "DELETED",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/**
 * Get user by Id
 * @param req
 * @param res
 */

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

/**
 * Get all users
 * @param req
 * @param res
 */

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};
