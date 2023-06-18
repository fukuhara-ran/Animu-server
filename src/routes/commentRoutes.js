const express = require('express');
const { Sequelize } = require("sequelize");
const { comment } = require('../../sequelize/models');
const router = express.Router();
const sequelize = new Sequelize("railway", "root", "DoI1nV2zpR1hkQeGnOTu", {
    host: "containers-us-west-69.railway.app",
    port: 7320,
    dialect: "mysql",
});

// GET /comments - Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST /comments - Create a new comment
router.post('/comments', async (req, res) => {
  const { content } = req.body;
  try {
    const newComment = await comment.create({ content });
    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// PUT /comments/:id - Update comment details
router.put('/comments/:id', async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;

  try {
    const updatedComment = await comment.findByPk(commentId);
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    updatedComment.content = content;

    await updatedComment.save();
    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE /comments/:id - Delete a comment
router.delete('/comments/:id', async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await comment.findByPk(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await deletedComment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;