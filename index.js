const express = require("express");
const routes = require("./app/routes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_URL;
const appName = process.env.APP_NAME;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.listen(port, () => {
  console.log(`${appName} listening at ${host}:${port}`);
});
