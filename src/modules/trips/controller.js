
const constants = require("../../utilities/constants");
const { customResponse } = require("../../utilities/helper");
const pool = require("./../../Database/db")
const {sendEmail} = require("../../utilities/email")



const createTrip = async (req, res )=>{
    try{
        console.log("create")
        userId =  await req.userId
        console.log(userId,"===")
        const {name, childname, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number} = req.body
        const status = "VARIFICATION PENDING"
        const insertTripDataQuery = `
        INSERT INTO trips (name, childname, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11);
        `;
        const values = [name, childname, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status,userId]
        
        
        
        
        const dataCreated = await pool.query(insertTripDataQuery, values);
        console.log('Trip data inserted successfully.');
        res.status(201).send(dataCreated.rows)
    }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);

    }


}

const getUserAllTrip = async(req,res) =>{

    try{
        console.log("get all tripes")

        userId = req.userId
    
        const allTripes = await pool.query('SELECT * FROM trips WHERE user_id = $1', [9]);
        console.log(allTripes.rows,"===-------->")
        res.status(202).send(allTripes)
    }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);


    }

}
const getOneTrip = async(req,res)=>{
    try{
        const tridId = req.params.id
        console.log(tridId,"get one trip")
       

        const tripData = await pool.query('SELECT * FROM trips WHERE id = $1', [tridId]);

        res.status(202).send(tripData.rows)
     }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);


    }

}
const updateUserStatus = async(req,res) =>{

    try{
        const tripStatus = req.body.tripStatus
        const tridId = req.params.id
        console.log(tripStatus,tridId)
        const updateStatusQuery = `
            UPDATE trips
            SET status = $1
            WHERE id = $2;
            `;
        values = [tripStatus,tridId]

        const tripeStatus = await  pool.query(updateStatusQuery,values);
        if (tripeStatus.rows){
           const mailsent = await sendEmail(tripStatus)

        }
        console.log('Status updated successfully.');
        console.log(tripeStatus.rows,"===-----")
        res.status(202).send(tripeStatus.rows)
     }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);


    }

}
const updateUserAllTrip = async(req,res) =>{

    try{
        console.log("update api's ====>")
        const tripId = req.params.id
        const {name, childname, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number} = req.body


        const updateStatusQuery = `
            UPDATE trips
            SET name=$1, childname=$2, relation=$3, departure_location=$4, destination=$5, date=$6, receiver=$7, receiver_relation=$8, receiver_phone_number=$9
            WHERE id = $10;`;
        
        let valuesdata = [name, childname, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number,tripId]
        const allTripes = await  pool.query(updateStatusQuery,valuesdata);
        console.log('Status updated successfully.');
        console.log(allTripes.rows,"<<<<===")
        res.status(202).send(allTripes.rows)
    }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);


    }

}
const getAllTrip = async(req,res) =>{

    try{
        console.log("data=====>>>>")

        // userId = req.userId
    
        const allTripes = await pool.query('SELECT * FROM trips');
       
        res.status(202).send(allTripes.rows)
    }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);


    }

}
const deleteOneTrip = async(req,res) =>{
    try{
        const tridId = req.params.id
        console.log(tridId,"delete==== one trip")
       

        const tripData = await pool.query('DELETE FROM trips WHERE id = $1', [tridId]);

        res.status(202).send(tripData.rows)
     }catch(error){
        console.log("error in post register user endpoint", error);
        code = error?.code ? error.code : constants.HTTP_400_CODE;
        message = error?.message ? error.message : constants.SOMETHING_WRONG_MSG;
        const resData = customResponse({
          code,
          message,
          err: error.message,
        });
        return res.status(400).send(resData);


    }
}
module.exports = {createTrip,getUserAllTrip,
    getOneTrip,updateUserStatus,
    updateUserAllTrip,getAllTrip,
    deleteOneTrip
}