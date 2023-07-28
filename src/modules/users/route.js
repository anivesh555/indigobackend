const express = require("express");
const router = express.Router();
const {sendEmail} = require("../../utilities/email")
const nodemailer = require("nodemailer");

const {
  registerUser,
  login,
  logout,
//   renewToken,
//   getAccount,
//   getAllUsers,
//   updateUser,
} = require("./controller");
const {
  verifyToken,
  verifyTokenAndAuthorize,
} = require("../../middleware/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);




// router.get("/status", async (req, res )=>{
//     // if(status){

    
//     const transporter = await nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         secure: true,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       });
//       const dd = {
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         secure: true,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       }
//       console.log(dd,"==")
//       const message = {
//         from: process.env.USER,
//         to: "abhadauriya.8445@gmail.com",
//         cc: "abhadauriya.8475@gmail.com",
//         subject: "emailData.subject",
//         text: "emailData.text",
//         // html: emailData.html,
//         // attachments: attachments,
//         //   attachments: [{ filename: "ex.png", path: "./ex.png" }],
//       };
//       let info = await transporter.sendMail(message);
//       console.log("Message sent: %s", info.messageId);
//     // emailRes = await sendEmail(message)
//     // if(!emailRes){
//     //   throw {
//     //     message:"error msg",
//     //     code: 404,
//     //   };
//     // }
//     res.sendStatus(202)
// //     }

// })

module.exports = router;
