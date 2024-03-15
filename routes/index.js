const router = require("express").Router();
const responseHandler = require("../helpers/responseHandler");
const auth = require("./auth");
const party = require("./party");
const presidental = require("./presidental");
const vicePresidental = require("./vice_presidental");
const pair_number = require("./candidate_pair_number");
const supporting_parties = require("./supporting_parties");
const vote = require("./vote");
const voting_result = require("./voting_result");

router.get("/test", (req, res) => {
  return responseHandler.succes(res, "Test Route");
});

router.use("/auth", auth);
router.use("/party", party);
router.use("/presidental", presidental);
router.use("/vice-presidental", vicePresidental);
router.use("/pair-number", pair_number);
router.use("/supporting-parties", supporting_parties);
router.use("/vote", vote);
router.use("/voting-result", voting_result);

module.exports = router;
