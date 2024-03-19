require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const ApiError = require("./helpers/errorHandler");
const http = require("http");
const socketIo = require("socket.io");

const { PORT } = process.env;

const app = express();

// app.use(
//   morgan((tokens, req, res) => {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens["remote-addr"](req, res),
//       tokens["remote-user"](req, res),
//       tokens["user-agent"](req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       JSON.stringify(req.headers),
//       JSON.stringify(req.body),
//       JSON.stringify(req.query),
//       JSON.stringify(req.params),
//       JSON.stringify(req.cookies),
//       JSON.stringify(req.signedCookies),
//       new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
//       tokens["response-time"](req, res),
//       "ms",
//     ].join(" ");
//   })
// );

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

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  const { Voting_result } = require("./models");

  console.log("New socket connection: " + socket.id);

  socket.on("data_result", async () => {
    const result = await Voting_result.findAll({});

    io.emit("data_result", result);
  });

  socket.on("new_vote", (candidateId) => {
    console.log("Vote masuk!");
    io.emit("new_vote", candidateId);
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
