const { Notification, notificationType } = require("../models/Notification");
const mongoose = require('mongoose');

/**
 *  @desc send follow notification to the user
 *  @route POST /follow/:id
 */
async function sendFollowNotification(followeeId) {
  try {
    // feature to implement -
    // before sending the notification we need to check whether the notification has already been send or not
    // that means if the notification already exists in the database or not. For that we'll need to store Ids of both
    // sender(follower) and receiver(followee)

    // notify the followee about the follow request -
    const notificationCreated = await Notification.create({
      type: notificationType.SEND_FOLLOW,
      receiverId: new mongoose.Types.ObjectId(followeeId),
    });
    console.log(notificationCreated);
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  sendFollowNotification,
};
