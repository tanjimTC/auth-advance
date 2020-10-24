const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 3200;
const mongoose = require("mongoose");

// mongoDB connect
mongoose.connect("mongodb://localhost:auth/auth-adv", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// check connecttion
mongoose.connection.on("connected", () => {
  console.log("connected");
});

// app set up
app.use(morgan("combined"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
const route = require("./routes/router");

app.use("/user", route);

// app.get("/morgan", function (req, res) {
//   res.send("hello, world!");
// });

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
