const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    subscriptions: [
        {
            userId: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = User = mongoose.model('user', UserSchema);
