const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username must be unique"],
        required: [true, "Username is required"],
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        trim: true
    },
    password: {
        type: String,
        minLength: [8, "Password must include atleast 8 characters"],
        maxLength: [12,"Password must not exceed 12 characters"],
        trim: true
    },
    phoneNumber: {
        type: String,
        minLength: [10, "Phone number must have 10 characters"],
        maxLength: [10,"Phone number must have 10 characters"],
        trim: true
    },
    bio: {
        type: String,
        trim: true,
        maxLength: [100, "Bio can't have more than 50 characters"]
    },
    stats:{
        postCount: {
            type: Number,
            default: 0
        },
        FollowerCount: {
            type: Number,
            default: 0
        },
        FollowingCount: {
            type: Number,
            default: 0
        }
    },
    privacy: {
        profileVisibility: {
            type: Boolean,
            default: true
        },
        allowMessages: {
            type: Boolean,
            default: true
        }
    }
},{
    strict: true,
    timestamps: true
}
);

const user = mongoose.model('User',userSchema);

module.exports = user;