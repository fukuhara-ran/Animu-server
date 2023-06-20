const { Sequelize, Transaction } = require("sequelize");
const { account, user } = require("../../sequelize/models"); // Assuming you have defined the Account model
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const sequelize = new Sequelize(config.development);

  try {
    const { username, email, password } = req.body;

    // create new user
    const newAccount = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        return await account.create(
          {
            username: username,
            email,
            password: password,
            user: {
              name: username,
            },
          },
          { transaction: t, include: user }
        );
      }
    );

    const response = {
      code: 201,
      status: "Created",
      message: "User has been successfully created",
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

module.exports = { signup };

const signin = async (req, res) => {
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

    const token = await jwt.sign(
      { payload: { userId: account.user.userId } },
      "IniSecredKey"
    );

    const response = {
      code: 200,
      status: "OK",
      message: "User has been successfully logged in",
      data: {
        token: token,
        user: account.user,
      },
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
