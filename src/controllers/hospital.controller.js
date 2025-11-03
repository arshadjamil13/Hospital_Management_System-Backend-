const {Hospital} = require("../models/Hospital.model")

async function getallhospitals(req, res){
    try {
    const hospitals = await Hospital.find();
    if (!hospitals) return res.status(404).json({ message: "Hospitals not found" });

    return res.status(200).json(hospitals);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};


// ✅ Get single hospital details
async function getHospitalById  (req, res) {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    return res.status(200).json(hospital);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {getallhospitals,getHospitalById}