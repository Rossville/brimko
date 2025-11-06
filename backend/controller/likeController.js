const { Like, TargetType_ENUM } = require("../models/Like");
const Post = require("../models/Post");
const mongoose = require("mongoose");

/**
 * @desc user can like the post of the other developers
 * @route GET /posts/:id/like
 */
async function likePost(req, res) {
  try {
    const PostId = req.params.id;
    if (!PostId)
      return res.status(400).json({ msg: "Post can't be undefined" });
    if (!mongoose.Types.ObjectId.isValid(PostId))
      return res.status(400).json({ msg: "Post Id is not Valid" });
    const postExists = Post.findById(PostId);
    if (!postExists)
      return res.status(404).json({ msg: "Post does not Exists" });
    const likeExists = Like.findOne({
      targetId: new mongoose.Types.ObjectId(PostId),
    }).select("_id");
    if (!likeExists) {
      const likedPost = await Like.create({
        targetType: TargetType_ENUM.POST,
        count: 1,
        targetId: PostId,
      });
      console.log(likedPost);
    }
    else{
        const likeUpdated = await Like.updateOne({ targetId: PostId},{ $inc: {count: 1}});
        console.log(likeUpdated);
    }
    return res.status(200).json({ msg: "Post Liked Successfully" });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = {
  likePost,
};
