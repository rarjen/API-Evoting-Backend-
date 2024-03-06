const router = require("express").Router();
const pair_number = require("../controllers/candidate_pair_number");
const isAuthenticate = require("../middlewares/authentication");
const validate = require("../utils/validatorIndex");
const {
  createPairNumberValidator,
  updatePairNumberValidator,
} = require("../services/candidate_pair_number/validators/candidate_pair_number.validators");

router.use(isAuthenticate);
router.post("/", validate(createPairNumberValidator), pair_number.createNumber);
router.get("/", pair_number.getNumbers);
router.get("/:id", pair_number.getNumber);
router.patch(
  "/:id",
  validate(updatePairNumberValidator),
  pair_number.updateNumber
);
router.delete("/:id", pair_number.destroyNumber);

module.exports = router;
