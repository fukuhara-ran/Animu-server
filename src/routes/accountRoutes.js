const express = require('express');
const sequelize = require('sequelize');
const Account = require('../../sequelize/models')
const router = express.Router();

// GET /account - Get account details
router.get('/account', async (req, res) => {
  try {
    const accounts = await Account.findAll(); // Retrieve all accounts from the database
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST /account - Create a new account
router.post('/post', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newAccount = await Account.create({ username, email, password }); // Create a new account in the database
    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// PUT /account/:id - Update account details
router.put('/:id', async (req, res) => {
  const accountId = req.params.id;
  const { username, email, password } = req.body;

  try {
    const account = await Account.findByPk(accountId); // Find the account by ID
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
    const account = await Account.findByPk(accountId); // Find the account by ID
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