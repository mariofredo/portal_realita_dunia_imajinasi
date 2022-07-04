const express = require("express");
const CommentController = require("../controllers/commentController");
const authr = require("../middlewares/authr");
const router = express.Router();

router.get("/", CommentController.findAllComment);
router.post("/", CommentController.createComment);
router.delete("/:id", authr, CommentController.deleteComment);
module.exports = router;
