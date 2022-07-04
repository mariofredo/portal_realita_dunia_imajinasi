const { ObjectId } = require("mongodb");
const Comment = require("../models/comments");

async function authr(req, res, next) {
  try {
    const id = req.params.id;
    const find = await Comment.findById({ _id: ObjectId(id) });
    const { userId } = req.dataUser;
    if (JSON.stringify(userId) != JSON.stringify(find.userId)) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authr;
