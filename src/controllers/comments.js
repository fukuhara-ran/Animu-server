const { Sequelize, Transaction } = require("sequelize");
const { comment, reply, user } = require("../../sequelize/models");
// const config = require("../../config/config.json");
const dbConfig = require("../../config/config")[
  process.env.NODE_ENV || "development"
];

const createComment = async (req, res) => {
  // const sequelize = new Sequelize(config.development);
  const sequelize = new Sequelize(dbConfig);

  try {
    const { userId } = req;
    const { title, content } = req.body;

    const newComment = await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        return await comment.create(
          {
            title: title,
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

const getComment = async (req, res) => {
  try {
    const Comment = await comment.findAll({
      order: [["created_at", "DESC"]],
      include: { model: user },
    });

    if (Comment.length === 0) {
      throw new Error("No comment found");
    }

    const response = {
      code: 200,
      status: "Ok",
      data: Comment,
    };

    return res.status(200).json(response);
  } catch (error) {
    const response = {
      code: 404,
      status: "Not Found",
      message: error.message || "No comments found",
    };
    console.log(error);
    console.log(response);

    return res.status(response.code).json(response);
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

const getReply = async (req, res) => {
  try {
    const { commentId } = req.body;

    const Reply = await reply.findAll({
      where: { commentId: commentId },
      order: [["created_at", "DESC"]],
      include: { model: user, comment },
    });

    if (Reply.length === 0) {
      throw new Error("No reply found");
    }

    const response = {
      code: 200,
      status: "Ok",
      data: Reply,
    };

    return res.status(200).json(response);
  } catch (error) {
    const response = {
      code: 404,
      status: "Not Found",
      message: error.message || "No comments found",
    };
    console.log(error);
    console.log(response);

    return res.status(response.code).json(response);
  }
};

const getCommentyById = async (req, res) => {
  const sequelize = new Sequelize(dbConfig);

  try {
    const { commentId } = req.body;

    const Comment = await comment.findOne({
      where: { commentId: commentId },
      include: {
        model: reply
      },
    });

    const response = {
      code: 200,
      status: "Ok",
      message: "Comment has been successfully retrieved",
      data: Comment,
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
    console.log(error);

    return res.status(response.code).json(response);
  } finally {
    await sequelize.close();
  }
};


module.exports = { createComment, createReply, getComment, getReply, getCommentyById };
