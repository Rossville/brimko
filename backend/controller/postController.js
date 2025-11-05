const Post = require("../models/Post");
const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * @desc allows users to create posts
 * @route /user/post/create
 */
async function createPost(req, res) {
  try {
    const { content } = req.body;
    if (!content)
      res.status(400).json({
        msg: "Cannot upload empty post",
      });
    const { email } = req.token;
    if (!email)
      res.status(400).json({
        msg: "Session Expired",
      });
    // find user from the corresponding to the token
    const userExists = await User.findOne({ email }).select(
      "_id email username"
    );
    if (!userExists)
      res.status(404).json({
        msg: "User not found",
      });
    // get all tags out of the content and save them in database.
    console.log(content);
    let str = "";
    let tags = [];
    let insideTag = false;
    let ch;
    for (let i = 0; i < content.length; i++) {
      ch = content[i];
      if (ch === "#") {
        if (str) tags.push(str);
        str = "";
        insideTag = true;
      } else if (insideTag && (ch === " " || ch === "\n" || ch === "\t")) {
        tags.push(str);
        str = "";
        insideTag = false;
      } else if (insideTag) {
        str += ch;
      }
    }
    if (insideTag && str) tags.push(str);
    console.log(userExists._id);
    const authorId = await User.findOne({ email }).select("_id");
    if(!authorId) return res.status(404).json({
      msg: "User does not exists"
    });
    const savepost = await Post.create({
      content,
      tags,
      isPublished: true,
      authorId: authorId._id,
    });
    console.log(`Post Id: ${savepost._id} \n Post Content: ${savepost}`);
    res.status(201).json({
      msg: "Post created Successfully",
    });
  } catch (err) {
    // if(err.name === "ValidationError"){
    //     const errors = Object.values(err.errors).map(e => e.message);
    //     return res.status(400).json({
    //         msg: "Validation Failed",
    //         errors
    //     })
    // }
    console.log(err.stack);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

/**
 * @desc gives a specific post of the user if PostId must be given
 * @route /user/post/:id
 */
async function showPost(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ msg: "Post not Found" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({
        msg: "Post Id is not valid",
      });
    const post = await Post.findById(id);
    console.log(post._doc);
    return res.status(200).json({ post: post._doc });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

/**
 * @desc returns all the post of the user
 * @route /user/posts
 */
async function showAllPost(req, res) {
  try {
    const { email } = req.token;
    console.log(email);
    if (!email)
      return res.status(403).json({
        msg: "User is not Authenticated",
      });
    const user = await User.findOne({ email }).select("_id");
    if(!user) return res.status(404).json({msg: "User does not exists"});
    const posts = await Post.find({authorId: user._id});
    console.log(posts);
    res.status(200).json({posts});
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  createPost,
  showPost,
  showAllPost
};
