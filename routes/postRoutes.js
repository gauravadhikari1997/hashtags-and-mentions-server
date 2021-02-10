const mongoose = require("mongoose");
const Post = mongoose.model("posts");

module.exports = (app) => {
  //to get all posts
  app.get(`/api/posts`, async (req, res) => {
    let posts = await Post.find({});
    if (!posts) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      posts,
    });
  });

  //to search posts
  app.get(`/api/post/search`, async (req, res) => {
    let posts = await Post.find({ name: new RegExp(req.query.name, "i") });
    if (!posts) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      posts,
    });
  });

  //to get a post
  app.get(`/api/post/:id`, async (req, res) => {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      post,
    });
  });

  //to add a post
  app.post(`/api/post`, async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).send({
        error: true,
        errorMessage: "You must provide details",
      });
    }
    let post = await Post.create(body);
    post.save(function (err) {
      if (err) {
        return res.status(400).send({
          error: true,
          errorMessage: "Invalid details",
        });
      }
    });
    return res.status(200).send({
      error: false,
      post,
    });
  });

  //to modify a post
  app.put(`/api/post/:id`, async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        error: true,
        errorMessage: "You must provide details",
      });
    }
    let post = await Post.updateOne({ _id: req.params.id }, body);
    return res.status(200).send({
      error: false,
      post,
    });
  });

  //to delete a post
  app.delete(`/api/post/:id`, async (req, res) => {
    let post = await Post.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      error: false,
      post,
    });
  });
};
