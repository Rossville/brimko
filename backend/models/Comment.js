const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    likeCount: {
        type: Number,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
},{
    timestamps: true,
    strict: true
});

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;