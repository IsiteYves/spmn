const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/database").connect();

const app = express();

// configure cors
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Supamenu APIs!" });
});

require("./routes/menu.route")(app);
require("./routes/user.route")(app);
require("./routes/resto.route")(app);
require("./routes/table.route")(app);
require("./routes/order.route")(app);

app.use(function (req, res) {
  return res.status(404).json({ error: "Resource not found" });
});

module.exports = app;
