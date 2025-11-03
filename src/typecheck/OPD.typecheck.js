const { z } = require("zod");
const opdPatientSchema = z.object({
  hospitalId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  name: z.string().min(2, "Name is required"),
  department: z.string().min(2, "Department is required"),
});

const checkHospitalId = z.object({
    hospitalId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})

const checkpatientId = z.object({
    hospitalId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
})

module.exports = { opdPatientSchema ,checkHospitalId,checkpatientId};