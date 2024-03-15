const router = require("express").Router();
const voting_result = require("../controllers/voting_result");
const isAuthenticate = require("../middlewares/authentication");

router.use(isAuthenticate);
router.post("/", voting_result.createVotingResult);
router.get("/:candidate_pair_number_id", voting_result.getOneVotingResult);
router.get("/", voting_result.getAllVotingResult);
router.patch("/:candidate_pair_number_id", voting_result.updateVotingResult);
router.delete("/:candidate_pair_number_id", voting_result.destroyVotingResult);

module.exports = router;
