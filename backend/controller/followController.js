const Follow = require("../models/Follow");
const User = require("../models/user");
const mongoose = require("mongoose");
const { sendFollowNotification } = require("./notificationController");

/**
 * @desc send follow request to a user
 * @route POST /follow/:id
 */
async function sendFollow(req, res) {
  try {
    // verify token
    const { email } = req.token;
    if (!email)
      return res.status(403).json({
        msg: "User not authorized",
      });
    const followeeId = req.params.id;
    if (!followeeId)
      return res.status(400).json({
        msg: "User Id must be provided",
      });
    if (!mongoose.Types.ObjectId.isValid(followeeId))
      return res.status(400).json({ msg: "User Id is not valid" });
    const userExists = await User.findById(followeeId);
    if(!userExists) return res.status(404).json({msg: "User not Found"});
    const followerId = await User.findOne({ email }).select("_id");
    const followCreated = await Follow.create({
        followerId: new mongoose.Types.ObjectId(followerId),
        followeeId: new mongoose.Types.ObjectId(followeeId)
    });
    // send follow notification
    sendFollowNotification(followeeId);
    console.log(followCreated);
    res.status(200).json({
        msg: "Follow req send successfully"
    })
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  sendFollow,
};
