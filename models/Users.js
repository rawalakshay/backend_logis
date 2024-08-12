const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    userId: { type: String, unique: true },
    password: { type: String },
    userType: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
