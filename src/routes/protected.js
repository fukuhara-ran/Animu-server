const express = require("express");
const { logout } = require("../controllers/auth");

const routes = express.Router();

routes.post("/logout", logout);

module.exports = routes;