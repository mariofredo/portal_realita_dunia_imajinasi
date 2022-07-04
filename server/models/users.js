const { getDB } = require("../config/mongodbConnection");
const { ObjectId } = require("mongodb");

class User {
  static user() {
    return getDB().collection("users");
  }
  static async findAll() {
    try {
      const users = await this.user().find().toArray();
      return users;
    } catch (err) {
      throw err;
    }
  }
  static async findById(obj) {
    try {
      const user = await this.user().findOne(obj);
      return user;
    } catch (err) {
      throw err;
    }
  }
  static async create(obj) {
    try {
      const user = await this.user().insertOne(obj);
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
