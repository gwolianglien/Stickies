const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    stickies: [
        {
            sticky: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'sticky',
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
