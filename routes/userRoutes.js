const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  //to get all users
  app.get(`/api/users`, async (req, res) => {
    let users = await User.find({});
    if (!users) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      users,
    });
  });

  //to get a user
  app.get(`/api/user/:id`, async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(204).send({
        error: true,
      });
    }
    return res.status(200).send({
      error: false,
      user,
    });
  });

  //to add a user
  app.post(`/api/user`, async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).send({
        error: true,
        errorMessage: "You must provide details",
      });
    }
    let user = await User.create(body);
    user.save(function (err) {
      if (err) {
        return res.status(400).send({
          error: true,
          errorMessage: "Invalid details",
        });
      }
    });
    return res.status(200).send({
      error: false,
      user,
    });
  });

  //to modify a user
  app.put(`/api/user/:id`, async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        error: true,
        errorMessage: "You must provide details",
      });
    }
    let user = await User.updateOne({ _id: req.params.id }, body);
    return res.status(200).send({
      error: false,
      user,
    });
  });

  //to delete a user
  app.delete(`/api/user/:id`, async (req, res) => {
    let user = await User.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      error: false,
      user,
    });
  });
};
