const socketIo = require("socket.io");
const {
  Voting_result,
  Presidental_candidate,
  Vice_presidental_candidate,
  Candidate_pair_number,
} = require("../models");

function websocket(app, server) {
  const io = socketIo(server);
  let intervalId = null;

  io.on("connection", (socket) => {
    console.log("New socket connection: " + socket.id);

    socket.on("data_result", async () => {
      const result = await Voting_result.findAll({});

      io.emit("data_result", result);
    });

    socket.on("new_vote", (candidateId) => {
      console.log("Vote masuk!");
      io.emit("new_vote", candidateId);
    });

    // Memeriksa apakah interval belum berjalan dan ada setidaknya satu klien terhubung
    if (!intervalId && io.engine.clientsCount > 0) {
      intervalId = setInterval(async () => {
        const result = await Voting_result.findAll({
          include: {
            model: Candidate_pair_number,
            as: "number",
            include: [
              { model: Presidental_candidate, as: "presidental_candidate" },
              {
                model: Vice_presidental_candidate,
                as: "vice_presidental_candidate",
              },
            ],
          },
          order: [["total_vote", "DESC"]],
        });

        const data = result.map((result) => ({
          id: result.id,
          candidate_pair_number_id: result.candidate_pair_number_id,
          total_vote: result.total_vote,
          percentage: result.percentage,
          number: result.number.number,
          img_result: result.number.img_url,
          presidental_name: result.number.presidental_candidate.name,
          vice_presidental_name: result.number.vice_presidental_candidate.name,
        }));

        console.log("Data Updated");

        io.emit("data_update", data);
      }, 3000);
    }

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected");

      // Hentikan interval jika tidak ada klien yang tersambung
      if (io.engine.clientsCount === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  });
}

module.exports = { websocket };

module.exports = { websocket };
