const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    created_at: { type: Date, default: Date.now },
    isBaned: { type: Boolean, default: false },
  });

const User = mongoose.model('User', userSchema);
module.exports = User;