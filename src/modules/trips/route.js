const express = require("express");
const router = express.Router();
const {createTrip,getUserAllTrip,
  getOneTrip,updateUserStatus,
  updateUserAllTrip,getAllTrip,
  deleteOneTrip
}= require("./controller")
const {
    verifyToken,
    verifyTokenAndAuthorize,
  } = require("./../../middleware/auth")
  
router.post("/",verifyToken,createTrip)   //tested - create trip by user
router.get("/",verifyToken,getUserAllTrip)      //tested - get all trips of a user
router.get("/user/:id",verifyToken,getOneTrip)      //tested - get one trip with tripId
router.delete("/user/:id",verifyToken,deleteOneTrip)      //tested - delete one trip with tripId
router.put("/:id",verifyToken,updateUserAllTrip)      // updating - all field by user itself
router.put("/status/:id",verifyToken,updateUserStatus)  //tested - for updating status by security
router.get("/all",verifyToken,getAllTrip)        //tested - get all available trips for security




module.exports = router