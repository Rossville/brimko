const mongoose = require('mongoose');

const notificationType = Object.freeze({
    SEND_FOLLOW: 'send_follow',
    ACCEPT_FOLLOW: 'accept_follow',
    MESSAGE: 'message',
});

// The window size of notification for each user is 8 among which 3 is for follow, accept - 3
// which means older notification will be automatically removed from the database.

const notificationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(notificationType),
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{
    timestamps: true,
    strict: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {Notification, notificationType};