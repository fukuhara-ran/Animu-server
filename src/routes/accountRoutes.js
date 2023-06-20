const express = require('express');
const { Sequelize } = require("sequelize");
const { account } = require('../../sequelize/models')
const router = express.Router();
const config = require("../../config/config.json");

// GET /account - Get account details
router.get('/account', async (req, res) => {
  try {
    const accounts = await account.findAll(); // Retrieve all accounts from the database
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST /account - Create a new account
router.post('/account/post', async (req, res) => {
  const { accountId, username, email, password, createdAt, updatedAt } = req.body;
  try {
    const newAccount = await account.create({ username, email, password}); // Create a new account in the database
    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// PUT /account/:id - Update account details
router.put('/account/:id', async (req, res) => {
  const accountId = req.params.id;
  const { username, email, password } = req.body;

  try {
    const account = await account.findByPk(accountId); // Find the account by ID
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Update the account attributes
    account.username = username;
    account.email = email;
    account.password = password;

    await account.save(); // Save the updated account
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE /account/:id - Delete the account
router.delete('/:id', async (req, res) => {
  const accountId = req.params.id;

  try {
    const account = await account.findByPk(accountId); // Find the account by ID
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await account.destroy(); // Delete the account
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;