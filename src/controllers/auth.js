const { Sequelize, Transaction } = require("sequelize");
const { account, user } = require("../../sequelize/models");
const config = require("../../config/config.json");
const jwt = require("jsonwebtoken");

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

    const Account = await account.findOne({
      where: {
        username: username,
      },
      include: user,
    });

    if (!Account) {
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
      return password === Account.password ? true : false;
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

    console.log(Account);

    const token = jwt.sign(
      { payload: { userId: Account.user.userId } },
      "M1bSh0CA0W"
    );

    res.cookie("animuAuthenticatedUser", token, {
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
    console.log(error);

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

const logout = async (req, res) => {
  try {
    const response = {
      code: 200,
      status: 'Ok',
      message: 'Logout success'
    }

    // clear cookie
    res.clearCookie('animuAuthenticatedUser')

    return res.status(200).json(response)
  } catch (error) {
    error.code = 500

    const response = {
      code: error.code,
      status: 'Internal Server Error',
      message: error.message
    }

    console.error(response)
    return res.status(response.code).json(response)
  }
}

module.exports = { register, login, logout };