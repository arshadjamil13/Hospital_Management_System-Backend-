require("dotenv").config();
const express = require ("express")
const cors = require("cors")
const connectDB = require("./config/db");

const HospitalRouter = require("./src/routes/Hospital.routes")
const BedRouter = require("./src/routes/Bed.routes")
const OPDRouter = require("./src/routes/OPD.routes")
const AdmittedPatientRouter = require("./src/routes/AdmittedPatient.routes")
const AuthRouter = require("./src/routes/Auth.routes")


const app= express()
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json())

connectDB();

app.use("/api/hospitals", HospitalRouter)
app.use("/api/beds", BedRouter)
app.use("/api/opd", OPDRouter)
app.use("/api/admit", AdmittedPatientRouter)
app.use("/api/auth", AuthRouter)

app.listen(process.env.PORT, ()=>{
    console.log("Server Running on port 5000")
})