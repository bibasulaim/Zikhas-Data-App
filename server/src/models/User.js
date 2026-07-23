const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    walletBalance: { type: Number, default: 0.00 },
    role: { type: String, default: 'user' } // 'user' or 'admin'
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
