require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000; 
const public = require("./routes/public")
const protected = require("./routes/protected")
const { verifyToken } = require("./middleware/verifyToken");
const cors = require("cors");

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.cookie("sfsf","animuAuthenticatedUser",{
    maxAge: 100,
  });
  console.log("Cookies: ", req.cookies);
  res.send(req.cookies);
});

app.use("/", public);
app.use(verifyToken);
app.use("/", protected);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});