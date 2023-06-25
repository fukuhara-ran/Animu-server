const express = require("express");
const { logout } = require("../controllers/auth");
const { createComment, createReply } = require("../controllers/comments")
const { updateUserInfo, getProfile } = require("../controllers/profile")

const routes = express.Router();

routes.post("/update", updateUserInfo);
routes.post("/getinfo", getProfile);

routes.post("/comment", createComment);
routes.post("/reply", createReply);

routes.post("/logout", logout);

module.exports = routes;