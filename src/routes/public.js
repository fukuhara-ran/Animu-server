const express = require("express");
const { register, login } = require("../controllers/auth");
const { getComment, getReply, getCommentyById } = require("../controllers/comments");

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/komen", getComment);
routes.get("/repli", getReply);
routes.get('/comment/:id', getCommentyById)

module.exports = routes;