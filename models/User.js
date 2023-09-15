// Import the Mongoose library
const mongoose = require('mongoose');

// Define a new Mongoose schema for the User model
const userSchema = new mongoose.Schema({
  // Define the 'username', 'pw' field with type String, required, and unique constraints
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Create a Mongoose model named 'User' based on the userSchema
const User = mongoose.model('User', userSchema);
// Export the User model for use in other parts of the application
module.exports = User;
