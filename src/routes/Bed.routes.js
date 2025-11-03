const express = require("express");
const router = express.Router();
const {getallbedsofhospital,updatebedstatus,assignpatienttobed,freebedfrompatient} = require("../controllers/bed.controller")
const {authMiddleware} = require("../Middleware/AuthMiddleware")

router.get("/:hospitalId",getallbedsofhospital)
router.put("/updatestatus/:bedId",authMiddleware,updatebedstatus) 
router.put("/assignpatient/:bedId",authMiddleware,assignpatienttobed)
router.put("/freebed/:bedId",authMiddleware,freebedfrompatient)

module.exports = router
