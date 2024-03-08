const router = require("express").Router();
const vote = require("../controllers/vote");
const isAuthenticate = require("../middlewares/authentication");

router.use(isAuthenticate);
router.post("/", vote.createVotingLog);
router.get("/:id", vote.getOneVotigLog);
router.get("/", vote.getAllVotingLog);

module.exports = router;
