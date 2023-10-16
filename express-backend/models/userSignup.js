const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User model based on the schema
const UserSignUp = mongoose.model('UserSignUpDetail', userSchema);

module.exports = UserSignUp;
