const { getDB } = require("../config/mongodbConnection");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
class UserController {
  static async findAllUser(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      res.status(201).json({ message: "Account successfully created" });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const find = await User.findById({ email });

      if (!find) throw new Error("failed_login");

      const isValid = bcrypt.compareSync(password, find.password);
      if (!isValid) throw new Error("failed_login");

      const payload = {
        userId: find._id,
        userEmail: find.email,
      };
      const access_token = jwt.sign(payload, process.env.SECRET_KEY);

      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
