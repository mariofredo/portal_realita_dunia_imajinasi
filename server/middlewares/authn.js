const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const User = require("../models/users");
require("dotenv").config();
async function authn(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = jwt.verify(access_token, process.env.SECRET_KEY);
    const user = await User.findById({ _id: ObjectId(payload.userId) });
    if (!user) {
      throw new Error("id_not_found_authn");
    }
    req.dataUser = {
      userId: user._id,
      userEmail: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authn;
