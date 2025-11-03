const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: 'User'
    },
    followeeId: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: 'User'
    }
},{
    timestamps: true,
    strict: true
});