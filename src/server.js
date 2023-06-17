const { Sequelize } = require("sequelize");
const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const accountRoutes = require("./routes/accountRoutes");

const sequelize = new Sequelize("railway", "root", "DoI1nV2zpR1hkQeGnOTu", {
  host: "containers-us-west-69.railway.app",
  port: 7320,
  dialect: "mysql",
});

app.use(express.json());
app.use("/account", accountRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World! Hello Eperibodi');
// });

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
