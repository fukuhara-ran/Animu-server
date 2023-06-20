const { Sequelize } = require("sequelize");
const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const accountRoutes = require("./routes/accountRoutes");
const commntRoutes = require("./routes/commentRoutes")

const sequelize = new Sequelize("animu_db", "animu_db", "localhost", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

app.use(express.json());
app.use("/server", accountRoutes);

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
