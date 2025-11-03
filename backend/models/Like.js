const mongoose = require('mongoose');

const TargetType_ENUM = {
    POST: 'post',
    COMMENT: 'comment'
};

const LikeSchema = mongoose.Schema({
    targetType: {
        type: String,
        enum: Object.values(TargetType_ENUM)
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId(),
        refPath: 'targetTypeRef'
    },
    targetTypeRef: {
        type: String,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true,
    strict: true
});

const like = mongoose.model('Like', LikeSchema);

module.exports = like;