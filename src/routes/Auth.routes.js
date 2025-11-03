const express = require("express");
const router = express.Router();
const {registeruser,loginuser} = require("../controllers/auth.controller")

router.post("/signup",registeruser)
router.post("/signin",loginuser)

module.exports = router