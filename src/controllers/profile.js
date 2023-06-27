const { Sequelize, Transaction, json } = require("sequelize");
const { user } = require("../../sequelize/models");
// const config = require("../../config/config.json");
const dbConfig = require("../../config/config")[
  process.env.NODE_ENV || "development"
];

const updateUserInfo = async (req, res) => {
//   const sequelize = new Sequelize(config.development);
const sequelize = new Sequelize(dbConfig);

  try {
    const { userId, name, gender, about } = req.body;

    const updatedUser = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        return await user.update(
          {
            name: name,
            gender: gender,
            about: about,
          },
          { where: { userId: userId } },
          { transaction: t }
        );
      }
    );

    const response = {
      code: 200,
      status: "Ok",
      message: "The changes have been saved",
    };

    return res.status(200).json(response);
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

//const getProfile
const getProfile = async (req, res) => {
//   const sequelize = new Sequelize(config.development);
const sequelize = new Sequelize(dbConfig);

  try {
    const { userId } = req.body;

    const User = await user.findOne({ where: { userId } });

    if (!User) {
      throw new Error("User not found");
    }

    const response = {
      code: 200,
      status: "success",
      data: User,
    };

    return res.status(200).json(response);
  } catch (error) {
    error.code = 500;
    error.status = "error";

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

module.exports = { updateUserInfo, getProfile };
