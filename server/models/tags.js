const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodbConnection");

class Tag {
  static tag() {
    return getDB().collection("tags");
  }
  static async bulkCreate(array) {
    try {
      const tags = await this.tag().insertMany(array);
      return tags;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Tag;
