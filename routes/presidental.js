const router = require("express").Router();
const presidental = require("../controllers/presidental");
const isAuthenticate = require("../middlewares/authentication");
const validate = require("../utils/validatorIndex");
const {
  createPresidentalCandidateValidator,
  updatePresidentalCandidateValidator,
} = require("../services/presidental/validators/presidental.validator");

router.use(isAuthenticate);
router.post(
  "/",
  validate(createPresidentalCandidateValidator),
  presidental.createPresidental
);
router.get("/", presidental.getPresidentals);
router.get("/:id", presidental.getPresidental);
router.patch(
  "/:id",
  validate(updatePresidentalCandidateValidator),
  presidental.updatePresidental
);
router.delete("/:id", presidental.destroyPresidental);

module.exports = router;
