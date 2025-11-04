const express = require("express");
const router = express.Router();
const axios =require("axios");
const {OPDPatient} = require("../models/OPDPatient.model")

router.post("/ask",async function(req,res){
    try{
        const userprompt = req.body.prompt;

        async function getallInfo(){
            const response = await axios.get("https://hospital-management-system-backend-gky9.onrender.com/api/hospitals/");
            return response.data;
        }

        async function getOPDInfo(){
            try{
            const response = await OPDPatient.find({});
            return response
            }catch(error){
                console.log("Error fetching OPD info:", error);
            }
        }

        const HospitalInfo = await getallInfo();
        const OPDInfo = await getOPDInfo();
        const combinedprompt = `You are a helpful Hospital Information Assistant. Your job is to answer patient and visitor queries about hospitals in the city. the information of the hospitals of the city 
        are as follows: ${JSON.stringify(HospitalInfo)}. Now, answer the query based on this information. If the information is not available, politely inform the user that you do not have that information., if asked about the beds usually the total beds are
        30 and most of them like 25 to 28 are occupied. use this information also while answering. about the tickets this is the Information for the OPD tickets use this Information ${JSON.stringify(OPDInfo)} don"t give any patients name just use number of patients while answering`


        const apiresponse = await axios.post(
          process.env.AI_URL,
          {
            
              model: "openai/gpt-4o",
              messages: [
                {
                  role: "system",
                  content: combinedprompt,
                },
                { role: "user",
                content: userprompt 
                }
              ]},
            {
            headers: {
              Authorization: `Bearer ${process.env.AI_API_KEY}`,
              "Content-Type": "application/json",
            }
          }
        );

        const botresponse = apiresponse.data.choices[0].message.content;
        return res.status(200).json({ answer: botresponse });
    }catch(error){
        console.log("Error in /ask route:", error);
        return res.status(500).json({ error: "Server Error" });
    }
})

module.exports = router