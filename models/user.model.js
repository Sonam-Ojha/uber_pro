const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ✅ schema variable name fixed
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, 'First name must be at least 3 characters long'],
  },

  lastname: {
    type: String,
    required: true,
    minlength: [3, 'Last name must be at least 3 characters long'],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },

  password: {
    type: String,
    required: true,
    select: false, // hide by default
  },

  socketId: {
    type: String,
  }
}, { timestamps: true });

// ✅ generate JWT
// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });
// };

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
};

// ✅ compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(password, this.password);
};

// ✅ hash password (static method)
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// ✅ correct export
const User = mongoose.model('User', userSchema);
module.exports = User;
