const {z} = require("zod");

const checkBedId = z.object({
    bedId : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
});

const checkadmittedPatientId = z.object({
    admittedPatientId : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
});

const checkstatus = z.object({
    status : z.enum(["Available","Occupied","Maintenance"])
})

module.exports = {checkBedId,checkadmittedPatientId,checkstatus};