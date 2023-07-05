const express = require("express");
const { logout } = require("../controllers/auth");
const { createComment, createReply, getComment } = require("../controllers/comments")
const { updateUserInfo, getProfile } = require("../controllers/profile")

const routes = express.Router();

routes.post("/getinfo", getProfile);
routes.post("/update", updateUserInfo);

routes.post("/comment", createComment);
routes.post("/reply", createReply);
routes.post("/komen", getComment)

routes.post("/logout", logout);

module.exports = routes;