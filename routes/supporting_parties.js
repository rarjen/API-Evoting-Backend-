const router = require("express").Router();
const supporting_parties = require("../controllers/supporting_parties");
const isAuthenticate = require("../middlewares/authentication");
const validate = require("../utils/validatorIndex");
const {
  createSupportPartyValidator,
  updateSupportPartyValidator,
} = require("../services/supporting_parties/validators/supporting_parties.validators");

router.use(isAuthenticate);
router.post(
  "/",
  validate(createSupportPartyValidator),
  supporting_parties.createSupportingParty
);
router.get("/", supporting_parties.getSupportingParties);
router.get("/:id", supporting_parties.getSupportingParty);
router.patch(
  "/:id",
  validate(updateSupportPartyValidator),
  supporting_parties.updateSuportingParty
);
router.delete("/:id", supporting_parties.destroySupportingParty);

module.exports = router;
