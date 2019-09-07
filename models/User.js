const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    goals: [mongoose.Schema.Types.ObjectId]
});

module.exports = User = mongoose.model('user', UserSchema);
