const express = require("express");
const { logout } = require("../controllers/auth");
const { comment } = require("../controllers/comments")

const routes = express.Router();

routes.post("/logout", logout);
routes.post("/comment", comment);

module.exports = routes;