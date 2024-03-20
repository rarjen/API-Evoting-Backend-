require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const ApiError = require("./helpers/errorHandler");
const { websocket } = require("./helpers/websocket");
const http = require("http");
const { PORT } = process.env;

const app = express();
const server = http.createServer(app);

app.use(morgan("dev")); // for logging

app.use(express.json()); // read body type json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", router);

app.use((req, res, next) => {
  next(ApiError.notFound("Page not found!"));
});

app.use((error, req, res, next) => {
  console.log("Error:", error.message);
  return res.status(error.status || error.code || 500).send(error);
});

websocket(app, server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
