const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 7001;

//import models
require("./models/User");
require("./models/Tag");
require("./models/Post");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || `mongodb://localhost:27017/dashboard`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//import routes
require("./routes/userRoutes")(app);
require("./routes/tagsRoutes")(app);
require("./routes/postRoutes")(app);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
