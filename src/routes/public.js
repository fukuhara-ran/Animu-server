const express = require("express");
const { register, login } = require("../controllers/auth");
const { getComment } = require("../controllers/comments");

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/komen", getComment)

module.exports = routes;