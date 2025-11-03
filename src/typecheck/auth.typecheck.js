const {z} = require("zod")

const adminRegisterSchema = z.object({
  hospitalId: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = {adminRegisterSchema,adminLoginSchema}