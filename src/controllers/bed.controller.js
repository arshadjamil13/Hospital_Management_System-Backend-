const {Bed} = require("../models/Bed.model")
const {checkBedId,checkadmittedPatientId,checkstatus} =require("../typecheck/bed.typecheck")
const mongoose = require("mongoose")

async function getallbedsofhospital(req,res){
  console.log("hit");
  
    try {
      const hospitalObjectId = new mongoose.Types.ObjectId(req.params.hospitalId);
      // console.log("hospitalObjectId:", hospitalObjectId)
      console.log("req.params.hospitalId:", req.params.hospitalId)
    const beds = await Bed.find({ hospitalId: hospitalObjectId });
    // console.log("beds:", beds)
    if (!beds) return res.status(404).json({ message: "Beds not found" });
    return res.status(200).json(beds);
  } catch (error) {
    console.log("error:", error)
    return res.status(500).json({ error: "Server Error" });
  }
}

async function updatebedstatus(req,res){
    try {
    const { status } = req.body;
    const {parsedstatus} = checkstatus.safeparse({ status });
    if (!parsedstatus.success) return res.status(400).json({ message: "Invalid status value" });

    const {bedId} = req.params;
    const parsedBedId = checkBedId.safeparse( {bedId} );
    if (!parsedBedId.success) return res.status(400).json({ message: "Invalid BedId" });

    const bed = await Bed.findByIdAndUpdate(
      parsedBedId.data.bedId,
       {status : parsedstatus.data.status} ,
      { new: true }
    );

    if (!bed) return res.status(404).json({ message: "Bed not found" });
    return res.status(200).json(bed);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

async function assignpatienttobed(req,res){
    try{
        const { admittedPatientId } = req.body;
        const {parsedadmittedPatientId} = checkadmittedPatientId.safeparse({ admittedPatientId });
        if (!parsedadmittedPatientId.success) return res.status(400).json({ message: "Invalid AdmittedPatientId" });

        const {bedId} = req.params;
    const parsedBedId = checkBedId.safeparse( {bedId} );
    if (!parsedBedId.success) return res.status(400).json({ message: "Invalid BedId" });

    const bed = await Bed.findByIdAndUpdate(
      parsedBedId.data.bedId,
      { status: "Occupied", assignedTo: parsedadmittedPatientId.data.admittedPatientId },
      { new: true }
    );

    if(!bed) return res.status(404).json({ message: "Bed not assigned" });

    return res.status(200).json({ message: "Bed Assigned Successfully", bed });
    }catch(error){
        return res.status(500).json({ error: "Server Error" });
    }
}

async function freebedfrompatient(req,res){
    try {
        const {bedId} = req.params;
    const parsedBedId = checkBedId.safeparse( {bedId} );
    if (!parsedBedId.success) return res.status(400).json({ message: "Invalid BedId" });

    const bed = await Bed.findByIdAndUpdate(
      parsedBedId.data.bedId,
      { status: "Available", assignedTo: null },
      { new: true }
    );
    if (!bed) return res.status(404).json({ message: "Bed not found" });

    return res.status(200).json({ message: "Bed Freed Successfully", bed });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {getallbedsofhospital,updatebedstatus,assignpatienttobed,freebedfrompatient}