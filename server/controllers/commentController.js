const Comment = require("../models/comments");
const Tag = require("../models/tags");

class CommentController {
  static async findAllComment(req, res, next) {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }
  static async createComment(req, res, next) {
    try {
      const { userId } = req.dataUser;
      const { description, tags } = req.body;
      const newComment = await Comment.create({ userId, description });
      const newTags = await Tag.bulkCreate(
        tags.map((el) => {
          return {
            name: el,
            commentId: newComment.insertedId,
          };
        })
      );
      res.status(201).json({ message: "Comment successfully created" });
    } catch (err) {
      next(err);
    }
  }
  static async deleteComment(req, res, next) {
    try {
      const id = req.params.id;
      const comment = await Comment.destroy(id);
      res.status(200).json({ message: "Comment successfully deleted" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = CommentController;
