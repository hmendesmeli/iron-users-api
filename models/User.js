const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  email: { type: String, required: true, unique: true, minlength: 3, maxlength: 100 },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  birthdate: { type: Date },
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
