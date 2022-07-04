const express = require("express");
const router = express.Router();
const users = require("./users");
const comments = require("./comment");
const errHandler = require("../middlewares/errHandlers");
const authn = require("../middlewares/authn");

router.use("/users", users);
router.use(authn);
router.use("/comments", comments);
router.use(errHandler);
module.exports = router;
