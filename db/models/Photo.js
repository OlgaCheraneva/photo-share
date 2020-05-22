const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    comments: [
        {
            userId: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
            profileURI: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);
