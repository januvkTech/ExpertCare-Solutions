const {
  register,
  login,
  setAvatar,
  getEmployees,
  logout,
  emailVerification,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.post("/employees/:id", getEmployees);
router.get("/logout/:id", logout);
router.post("/verify/:id/:token/", emailVerification);
module.exports = router;
