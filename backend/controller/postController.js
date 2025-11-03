const Post = require("../models/Post");
const User = require("../models/user");
const {Types} = require('mongoose');
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
      }
      else if(insideTag && (ch === " " || ch === '\n' || ch === '\t')){
        tags.push(str);
        str = "";
        insideTag = false;
      }
      else if(insideTag){
        str += ch;
      }
    }
    const authorId = await User.findOne({ email }).select("_id");
    if(insideTag && str)tags.push(str);
    const savepost = await Post.create({
        content,
        tags,
        isPublished: true,
        authorId : authorId._id
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

module.exports = {
  createPost,
};
