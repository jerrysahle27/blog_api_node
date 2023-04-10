const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const posts = require("./routes/api/posts");
const cors = require("cors")
const app = express();
const db = require("./config/keys").mongoURI;

//middleware
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());
app.use(cors())
//passport jwt
app.use(passport.initialize());

//pass passport to config
require("./config/passport.js")(passport);

app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port", { port }));
