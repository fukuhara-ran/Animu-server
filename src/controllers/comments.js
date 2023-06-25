const { Sequelize, Transaction } = require("sequelize");
const { comment, reply } = require("../../sequelize/models");
// const config = require("../../config/config.json");
const dbConfig = require("../../sequelize/config/config")[
  process.env.NODE_ENV || "development"
];

const createComment = async (req, res) => {
  // const sequelize = new Sequelize(config.development);
  const sequelize = new Sequelize(dbConfig);

  try {
    const { content, userId } = req.body;

    const newComment = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        return await comment.create(
          {
            content: content,
            userId: userId,
          },
          { transaction: t }
        );
      }
    );

    const response = {
      code: 201,
      status: "Created",
      message: "Comment has been successfully created",
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

const createReply = async (req, res) => {
  // const sequelize = new Sequelize(config.development);
  const sequelize = new Sequelize(dbConfig);

  try {
    const { content, commentId, userId } = req.body;

    const newComment = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        return await reply.create(
          {
            content: content,
            commentId: commentId,
            userId: userId,
          },
          { transaction: t }
        );
      }
    );

    const response = {
      code: 201,
      status: "Created",
      message: "You have been replied",
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
    // console.log(error);

    return res.status(response.code).json(response);
  } finally {
    await sequelize.close();
  }
};

module.exports = { createComment, createReply };
