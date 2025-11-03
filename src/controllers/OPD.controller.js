const mongoose = require("mongoose");
const {OPDPatient} = require("../models/OPDPatient.model")
const { opdPatientSchema ,checkHospitalId,checkpatientId} = require("../typecheck/OPD.typecheck");

async function generatetokenforopd (req, res) {
    try {
    const data = opdPatientSchema.safeParse(req.body);
    if (!data.success) return res.status(400).json({ message: "Invalid data" });
    // Find last token for this hospital
    // console.log(data.data.hospitalId)
   const lastPatient = await OPDPatient.findOne({
      hospitalId: new mongoose.Types.ObjectId(data.data.hospitalId)
    }).sort({ tokenNumber: -1 });

      // console.log(lastPatient)
    const newToken = lastPatient ? lastPatient.tokenNumber + 1 : 1;
      // console.log(newToken)
    const newPatient = new OPDPatient({
      ...data.data,
      tokenNumber: newToken,
    });

    await newPatient.save();
    // console.log(newPatient)

    return res.status(201).json({
      message: "Token generated successfully",
      tokenNumber: newToken,
      patient: newPatient,
    });

  } catch (error) {
    if (error.errors) return res.status(400).json({ validationError: error.errors });
    console.log("🔥 OPD ERROR:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


async function getwaitingqueueandupdate (req, res) {
    try {
       const parsedhospitalId = checkHospitalId.safeParse({ hospitalId: req.params.hospitalId });
    if (!parsedhospitalId.success) return res.status(400).json({ message: "Invalid HospitalId" });


    const queue = await OPDPatient.find({
      hospitalId: parsedhospitalId.data.hospitalId,
      status: "Waiting"
    }).sort({ tokenNumber: 1 });

    // if (!queue) return res.status(404).json({ message: "No patients in queue" });
    if (queue.length === 0) return res.status(200).json({ message: "No patients in queue" });
    return res.status(200).json(queue);
  } catch (error) {
    console.log("🔥 OPD ERROR:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function movetoken (req, res) {
    try {

    const parsedhospitalId = checkHospitalId.safeparse({ hospitalId: req.params.hospitalId });
    if (!parsedhospitalId.success) return res.status(400).json({ message: "Invalid HospitalId" });

    const nextPatient = await OPDPatient.findOneAndUpdate(
      { hospitalId: parsedhospitalId.data.hospitalId, status: "Waiting" },
      { status: "In-Consultation" },
      { sort: { tokenNumber: 1 }, new: true }
    );

    if (!nextPatient) return res.json({ message: "No patients waiting" });

    return res.status(200).json({
      message: `Calling Token #${nextPatient.tokenNumber}`,
      nextPatient
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

async function completetokenforpatient (req, res) {
    try {
        const parsedPatientId = checkpatientId.safeparse({ patientId: req.params.patientId });
        if (!parsedPatientId.success) return res.status(400).json({ message: "Invalid PatientId" });

    const patient = await OPDPatient.findByIdAndUpdate(
      parsedPatientId.data.patientId,
      { status: "Completed" },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    return res.json({ message: "Consultation completed", patient });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = { generatetokenforopd, getwaitingqueueandupdate, movetoken, completetokenforpatient }