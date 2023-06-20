const { Sequelize, Transaction } = require("sequelize");
const { account, user } = require("../../sequelize/models"); // Assuming you have defined the Account model
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const sequelize = new Sequelize(config.development);

  try {
    const { username, email, password } = req.body;

    // create new user
    const newAccount = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async () => {
        return await account.create(
          {
            username: username,
            email,
            password: password,
            user: {
              name: username,
            },
          },
          { include: user }
        );
      }
    );

    const response = {
      code: 201,
      status: "Created",
      message: "Account created!",
    };

    return res.status(201).json(response);
  } catch (error) {
    error.code = 500;
    error.status = "Internal Server Error";

    const response = {
      code: error.code,
      status: error.status,
      message: error.message,
    };

    return res.status(response.code).json(response);
  } finally {
    await sequelize.close();
  }
};

const login = async (req, res) => {
  const sequelize = new Sequelize(config.development);

  try {
    const { username, password } = req.body;

    const account = await account.findOne({
      where: {
        username: username,
      },
      include: user,
    });

    if (!account) {
      const error = new Error("Account not found");
      error.code = 404;
      error.status = "Not Found";

      const response = {
        code: error.code,
        status: error.status,
        message: error.message,
      };

      return res.status(response.code).json(response);
    }

    const isPasswordValid = () => {
      return password === account.password ? true : false;
    };

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.code = 401;
      error.status = "Unauthorized";

      const response = {
        code: error.code,
        status: error.status,
        message: error.message,
      };

      return res.status(response.code).json(response);
    }

    console.log(account);

    const token = await jwt.sign(
      { payload: { userId: account.user.userId } },
      "M1bSh0CA0W"
    );

    res.cookie("token", token, {
      maxAge: 360000,
    });

    const response = {
      code: 200,
      status: "OK",
      message: "User loged in",
    };

    return res.status(response.code).json(response);
  } catch (error) {
    error.code = 500;
    error.status = "Internal Server Error";

    const response = {
      code: error.code,
      status: error.status,
      message: error.message,
    };

    return res.status(response.code).json(response);
  } finally {
    await sequelize.close();
  }
};

module.exports = { register, login };