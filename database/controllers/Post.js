const Post = require("../models/Post");

//possibly add .lean() in the future

const uploadPost = async (postData) => {
  const username = postData.username.toLowerCase();
  const post = new Post({
    username: username,
    profPhoto: postData.profPhoto || null,
    location: postData.location || null,
    url: postData.url,
    caption: postData.caption || null
  });
  const newPost = await post.save();
  return newPost;
};

const getUserPosts = async (username) => {
  const posts = await Post.find({ username }).exec();
  return posts;
};

const getDiscoveryPosts = async (limit, offset) => {
  const posts = await Post.find({})
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 });
  return posts;
};

const commentOnPost = async (photoID, username, profPhoto, comment) => {
  await Post.findByIdAndUpdate(photoID, {
    $push: { comments: { username, profPhoto, comment } },
  });
};


module.exports = { uploadPost, getUserPosts, getDiscoveryPosts, commentOnPost };
