// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },

  linkedinUrl: { type: String },
  university: { type: String },
  phone: { type: String },
  industry: { type: String },

  profileImage: { type: String }, // URL to uploaded profile pic (can be stored on your server or any cloud storage)
headline: { type: String },     // Like "Product Designer" or "Software Engineer"
address: { type: String },      // optional
birthday: { type: Date },       // optional
gender: { type: String } ,       // optional ("Male", "Female", "Other")

  createdAt: {
    type: Date,
    default: Date.now
  },
  searches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Search'
  }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
