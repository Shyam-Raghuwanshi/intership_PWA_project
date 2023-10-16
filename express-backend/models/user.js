const mongoose = require('mongoose');

// Define a schema for your data
const User = new mongoose.Schema({
  id: {
    type: String, // or the appropriate type for your 'id' field
    required: true,
  },
  friendId: {
    type: String, // or the appropriate type for your 'friendId' field
    required: true,
  },
  password: {
    type: String, // or the appropriate type for your 'password' field
    required: true,
  },
  photo: {
    type: String, // or the appropriate type for your 'password' field
    required: true,
  },
  
});

// Create a model using the schema
const userModel = mongoose.model('User', User);
module.exports = userModel;
