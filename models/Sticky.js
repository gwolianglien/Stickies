const mongoose = require('mongoose');

const StickySchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: '',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Sticky = mongoose.model('sticky', StickySchema);
