const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/database").connect();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express();

// configure cors
app.use(cors());
const PORT = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

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
