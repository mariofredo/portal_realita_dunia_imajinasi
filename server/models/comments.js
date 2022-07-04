const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodbConnection");

class Comment {
  static comment() {
    return getDB().collection("comments");
  }
  static async findAll() {
    let comments = await this.comment()
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "_id",
            foreignField: "commentId",
            as: "Tags",
          },
        },
      ])
      .toArray();

    return comments.map((el) => {
      delete el.User[0].password;
      return el;
    });
  }
  static async create(obj) {
    try {
      const comment = await this.comment().insertOne(obj);
      return comment;
    } catch (err) {
      throw err;
    }
  }
  static async findById(obj) {
    try {
      const comment = await this.comment().findOne(obj);
      return comment;
    } catch (err) {
      throw err;
    }
  }
  static async destroy(id) {
    try {
      const comment = await this.comment().deleteOne({ _id: ObjectId(id) });
      return comment;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Comment;
