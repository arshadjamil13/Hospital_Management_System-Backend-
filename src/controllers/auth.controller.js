const {Admin} = require("../models/Admin.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {adminRegisterSchema ,adminLoginSchema } = require("../typecheck/auth.typecheck")

async function registeruser(req,res){
    try {
    const data = adminRegisterSchema.safeParse(req.body);
    if(!data.success) return res.status(400).json({message : "Please Give the required Input"})

    const existingAdmin = await Admin.findOne({ username: data.data.username });
    if (existingAdmin) return res.status(400).json({ error: "Username already taken" });

    const passwordHash = await bcrypt.hash(data.data.password, 10);

    const newAdmin = new Admin({
      hospitalId: data.data.hospitalId,
      username: data.data.username,
      passwordHash,
    });

    await newAdmin.save();

    let token = jwt.sign(
      { adminId: newAdmin._id, hospitalId: newAdmin.hospitalId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    token =  "Bearer " + token

    return res.json({ message: "Admin Registered Successfully", newAdmin , token });
  } catch (error) {
    if (error.errors) return res.status(400).json({ validationError: error.errors });
    console.log("error:", error)
    return res.status(500).json({ error: "Server Error" });
  }
}

async function loginuser(req,res){
    try {
    const data = adminLoginSchema.safeParse(req.body);
    if(!data.success) return res.status(400).json({message : "Please Give the required Input"})

    const admin = await Admin.findOne({ username: data.data.username });
    if (!admin) return res.status(400).json({ error: "Invalid username" });

    const isMatch = await bcrypt.compare(data.data.password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { adminId: admin._id, hospitalId: admin.hospitalId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login Successful",
      token : "Bearer " + token,
      hospitalId: admin.hospitalId,
    });
  } catch (error) {
    if (error.errors) return res.status(400).json({ validationError: error.errors });
    console.log("error:", error)
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {registeruser,loginuser}