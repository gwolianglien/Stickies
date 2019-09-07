const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: true
    },
    by: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
