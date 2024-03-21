const router = require("express").Router();
const auth = require("../controllers/auth");
const isAuthenticate = require("../middlewares/authentication");

router.post("/register", auth.registerAccount);
router.post("/login", auth.loginAccount);

router.use(isAuthenticate);
router.get("/whoami", auth.authMe);
router.patch("/reset-password", auth.resetPasswordUser);

module.exports = router;
