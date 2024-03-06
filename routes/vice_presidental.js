const router = require("express").Router();
const vicePresidental = require("../controllers/vice_presidental");
const isAuthenticate = require("../middlewares/authentication");
const validate = require("../utils/validatorIndex");
const {
  createVicePresidentalCandidateValidator,
  updateVicePresidentalCandidateValidator,
} = require("../services/vice_presidental/validators/vice_presidental.validators");

router.use(isAuthenticate);
router.post(
  "/",
  validate(createVicePresidentalCandidateValidator),
  vicePresidental.createVicePresidental
);
router.get("/", vicePresidental.getVicePresidentals);
router.get("/:id", vicePresidental.getVicePresidental);
router.patch(
  "/:id",
  validate(updateVicePresidentalCandidateValidator),
  vicePresidental.updateVicePresidental
);
router.delete("/:id", vicePresidental.destroyVicePresidental);

module.exports = router;
