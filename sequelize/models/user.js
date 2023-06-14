// Import Sequelize and create a new instance
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('railway', 'root', 'DoI1nV2zpR1hkQeGnOTu', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database (create the table if it doesn't exist)
(async () => {
  await sequelize.sync();
  console.log('User model synced with database');
})();

// Example usage
(async () => {
  try {
    // Create a new user
    const newUser = await User.create({
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    console.log('New user created:', newUser.toJSON());

    // Find a user by username
    const foundUser = await User.findOne({
      where: { username: 'john_doe' },
    });
    console.log('Found user:', foundUser.toJSON());

    // Update a user's email
    await foundUser.update({ email: 'john.doe@gmail.com' });
    console.log('User email updated');

    // Delete a user
    await foundUser.destroy();
    console.log('User deleted');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
