const express = require("express");
const { register, login } = require("../controllers/auth");

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);

module.exports = routes;