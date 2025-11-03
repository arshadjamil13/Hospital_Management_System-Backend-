const express = require("express");
const router = express.Router();
const {admitpatient,getalladmittedpatients,dischargeadmittedpatient} = require("../controllers/AdmittedPatient.controller")
const {authMiddleware} = require("../Middleware/AuthMiddleware")

router.post("/admitpatient",authMiddleware,admitpatient)
router.get("/admittedpatients/:hospitalId",authMiddleware,getalladmittedpatients)
router.put("/dischargepatient/:admittedPatientId",authMiddleware,dischargeadmittedpatient)



module.exports = router