const {AdmittedPatient} =  require("../models/AdmittedPatients.model")
const {admittedPatientSchema, checkhospitalId, checkpatientId} = require("../typecheck/AdmittedPatient.typecheck")

async function admitpatient (req, res) {
    try {
    const data = admittedPatientSchema.safeParse(req.body);
    if (!data.success) return res.status(400).json({ message: "Invalid data" });

    // Create admitted record
    const admittedPatient = new AdmittedPatient(data.data);
    await admittedPatient.save();

    // Update bed status → Occupied
    await Bed.findByIdAndUpdate(data.data.bedId, {
      status: "Occupied",
      assignedTo: admittedPatient._id,
    });
    

    return res.status(201).json({
      message: "Patient Admitted & Bed Assigned Successfully",
      admittedPatient,
    });
  } catch (error) {
    if (error.errors) return res.status(400).json({ validationError: error.errors });
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getalladmittedpatients (req, res) {
    try {
         const parsedhospitalId = checkhospitalId.safeParse({ hospitalId: req.params.hospitalId });
    if (!parsedhospitalId.success) return res.status(400).json({ message: "Invalid HospitalId" });
    
    const result = await AdmittedPatient.find({
      hospitalId: parsedhospitalId.data.hospitalId,
      status: "Admitted",
    }).populate("bedId");

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

async function dischargeadmittedpatient(req,res){
    try {

        const parsedadmittedPatientId = checkpatientId.safeparse({ admittedPatientId: req.params.admittedPatientId });
        if (!parsedadmittedPatientId.success) return res.status(400).json({ message: "Invalid Admitted Patient Id" })

    const patient = await AdmittedPatient.findByIdAndUpdate(
      parsedadmittedPatientId.data.admittedPatient,
      {
        status: "Discharged",
        dischargeDate: new Date(),
      },
      { new: true }
    );

    // Free the bed
    await Bed.findByIdAndUpdate(patient.bedId, {
      status: "Available",
      assignedTo: null,
    });

    return res.status(200).json({ message: "Patient Discharged & Bed Freed", patient });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {admitpatient,getalladmittedpatients,dischargeadmittedpatient}
