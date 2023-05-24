const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const posts = require("./routes/api/posts");
const postcategorys = require("./routes/api/postcategory");
const cors = require("cors");
const app = express();
const db = require("./config/keys").mongoURI;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

//middleware
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

app.use(bodyparser.json());
app.use(cors());
//passport jwt
app.use(passport.initialize());
mongoose.connect(db);

//pass passport to config
require("./config/passport.js")(passport);

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/postcategorys", postcategorys);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port", { port }));
