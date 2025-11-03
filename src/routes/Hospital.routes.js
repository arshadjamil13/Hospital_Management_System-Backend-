const express = require("express");
const router = express.Router();
const {getallhospitals,getHospitalById} = require("../controllers/hospital.controller")

router.get("/",getallhospitals)
router.get("/:id",getHospitalById)

module.exports = router