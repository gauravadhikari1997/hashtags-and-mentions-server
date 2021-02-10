const mongoose = require("mongoose");
const Tag = mongoose.model("tags");

module.exports = (app) => {
  //to get all tags
  app.get(`/api/tags`, async (req, res) => {
    let tags = await Tag.find({});
    if (!tags) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      tags,
    });
  });

  //to search tags
  app.get(`/api/tag/search`, async (req, res) => {
    let tags = await Tag.find({ name: new RegExp(req.query.name, "i") });
    if (!tags) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      tags,
    });
  });

  //to get a tag
  app.get(`/api/tag/:id`, async (req, res) => {
    let tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      tag,
    });
  });

  //to add a tag
  app.post(`/api/tag`, async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).send({
        error: true,
        errorMessage: "You must provide details",
      });
    }
    let tag = await Tag.create(body);
    tag.save(function (err) {
      if (err) {
        return res.status(400).send({
          error: true,
          errorMessage: "Invalid details",
        });
      }
    });
    return res.status(200).send({
      error: false,
      tag,
    });
  });

  //to modify a tag
  app.put(`/api/tag/:id`, async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        error: true,
        errorMessage: "You must provide details",
      });
    }
    let tag = await Tag.updateOne({ _id: req.params.id }, body);
    return res.status(200).send({
      error: false,
      tag,
    });
  });

  //to delete a tag
  app.delete(`/api/tag/:id`, async (req, res) => {
    let tag = await Tag.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      error: false,
      tag,
    });
  });
};
