const express = require("express");
const { createReferral } = require("../controllers/controllers");
const { signUp } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");
const router = express.Router();

router.post("/referrals", createReferral);
router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
