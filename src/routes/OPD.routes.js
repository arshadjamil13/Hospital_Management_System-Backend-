const express = require("express");
const router = express.Router();
const{generatetokenforopd,getwaitingqueueandupdate,movetoken,completetokenforpatient} = require("../controllers/OPD.controller")
const {authMiddleware} = require("../Middleware/AuthMiddleware")

router.post("/generatetoken",generatetokenforopd)
router.get("/queue/:hospitalId",getwaitingqueueandupdate)
router.put("/next/:hospitalId",authMiddleware,movetoken)
router.put("/complete/:patientId",authMiddleware,completetokenforpatient)

module.exports = router 