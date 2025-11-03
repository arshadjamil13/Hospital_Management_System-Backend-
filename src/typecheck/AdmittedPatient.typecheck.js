const {z} = require("zod");

const admittedPatientSchema = z.object({
  hospitalId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  patientName: z.string().min(2, "Patient name required"),
  department: z.string().min(2, "Department required"),
  bedId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});

const checkhospitalId = z.object({
    hospitalId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})

const checkadmittedpatientId = z.object({
    admittedPatientId : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})

module.exports = { admittedPatientSchema,checkhospitalId ,checkadmittedpatientId};