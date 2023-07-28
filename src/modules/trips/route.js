const express = require("express");
const router = express.Router();
const {createTrip,getUserAllTrip,updateUserStatus,updateUserAllTrip,getAllTrip}= require("./controller")
const {
    verifyToken,
    verifyTokenAndAuthorize,
  } = require("./../../middleware/auth")
  
router.post("/",createTrip)   //tested
router.get("/",getUserAllTrip)      //tested
router.put("/:id",updateUserAllTrip)     
router.put("/status/:id",updateUserStatus)  //tested
router.get("/all",getAllTrip)        //tested




module.exports = router