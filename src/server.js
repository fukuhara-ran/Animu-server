const { Sequelize } = require("sequelize");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const public = require("./routes/public")
const { verifyToken } = require("./middleware/verifyToken");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.cookie("token",{
    maxAge: 360000,
  });
  console.log("Cookies: ", req.cookies);
  res.send(req.cookies);
});

app.use("/", public);
app.use(verifyToken);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();
