const router = require("express").Router();
const party = require("../controllers/party");
const isAuthenticate = require("../middlewares/authentication");
const validate = require("../utils/validatorIndex");
const {
  createPoliticalPartyValidator,
  updatePolitcalPartyValidator,
} = require("../services/party/validators/party.validator");

router.use(isAuthenticate);
router.post("/", validate(createPoliticalPartyValidator), party.createParty);
router.post("/create-many", party.createManyParties);
router.get("/", party.getParties);
router.get("/:id", party.getParty);
router.patch("/:id", validate(updatePolitcalPartyValidator), party.updateParty);
router.delete("/:id", party.destroyParty);

module.exports = router;
