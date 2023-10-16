const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
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
  friends:{
    type:Array
  }
});

// Create a User model based on the schema
const UserSignUp = mongoose.model('UserSignUpDetail', userSchema);

module.exports = UserSignUp;
