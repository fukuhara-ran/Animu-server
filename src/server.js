const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();
const port = process.env.EXPRESS_PORT; 
const public = require("./routes/public")
const protected = require("./routes/protected")
const { verifyToken } = require("./middleware/verifyToken");

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.cookie("animuAuthenticatedUser",{
    maxAge: 360000,
  });
  console.log("Cookies: ", req.cookies);
  res.send(req.cookies);
});

app.use("/", public);
app.use("/", protected);
app.use(verifyToken);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});