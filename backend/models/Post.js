const mongoose = require('mongoose');

const VISIBILITY_ENUM = Object.freeze({
    PUBLIC: true,
    PRIVATE: false // archive
});

const postSchema = mongoose.Schema({
    content: {
        type: String,
        maxLength: [500, "Post cannot contain more than 500 characters"],
        trim: true,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    visibility: {
        type: Boolean,
        enum: [VISIBILITY_ENUM.PUBLIC, VISIBILITY_ENUM.PRIVATE],
        default: VISIBILITY_ENUM.PUBLIC
    },
    tags: {
        type: [String]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "AuthorId is required, who created the post."]
    }
},{
    timestamps: true,
    strict: true
});

const post = mongoose.model("Post", postSchema);

module.exports = post;