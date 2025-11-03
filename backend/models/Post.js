const mongoose = require('mongoose');


const VISIBILITY_ENUM = Object.freeze({
    PUBLIC: true,
    PRIVATE: false
});

const postSchema = mongoose.Schema({
    content: {
        type: String,
        maxLength: [500, "Post cannot contain more than 500 characters"],
        trim: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    isPublished: Boolean,
    visibility: {
        type: Boolean,
        enum: [VISIBILITY_ENUM.PUBLIC, VISIBILITY_ENUM.PRIVATE],
        default: VISIBILITY_ENUM.PUBLIC
    },
    tags: {
        type: [String]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: 'User'
    }
},{
    timestamps: true,
    strict: true
});

const post = mongoose.model("Post", postSchema);

module.exports = post;