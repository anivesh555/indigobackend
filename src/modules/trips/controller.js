
const constants = require("../../utilities/constants");
const { customResponse } = require("../../utilities/helper");
const pool = require("./../../Database/db")



const createTrip = async (req, res )=>{
    try{
        // user_id = req.userId
        let {name, childName, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status} = req.body

        const insertTripDataQuery = `
        INSERT INTO trips (name, childName, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11);
        `;
        const values = [name, childName, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status,userId]
        
        const tripData = [
            'Summer Vacation',
            'Emily',
            'Daughter',
            'New York',
            'Los Angeles',
            '2023-08-15',
            'Jane Doe',
            'Mother',
            '555-123-4567',
            'pending',
            9,
        ];
        
        
        await pool.query(insertTripDataQuery, tripData);
        console.log('Trip data inserted successfully.');
        res.status(201).send("insert succesfully")
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

        userId = req.userId
    
        const allTripes = await pool.query('SELECT * FROM trips WHERE user_id = $1', [9]);
        console.log(allTripes.rows,"===-------->")
        res.status(202).send("fetched data successfully")
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
        console.log('Status updated successfully.');
        console.log(tripeStatus.rows,"===-----")
        res.status(202).send("fetched data successfully")
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
        let tripId = req.params.id
        let {name, childName, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status} = req.body


        const updateStatusQuery = `
            UPDATE trips
            SET name=$1, childName=$2, relation=$3, departure_location=$4, destination=$5, date=$6, receiver=$7, receiver_relation=$8, receiver_phone_number=$9, status=$10
            WHERE id = $11;
            `;
        let values = ['Summer Vacation',
        'Emily',
        'Daughter',
        'New York',
        'Los Angeles',
        '2023-08-15',
        'Jane Doe',
        'Mother',
        'pending',
        '555-123-4567',
        1
        ]
        let valuesdata = [name, childName, relation, departure_location, destination, date, receiver, receiver_relation, receiver_phone_number, status,tripId]
        const allTripes = await  pool.query(updateStatusQuery,values);
        console.log('Status updated successfully.');
        console.log(allTripes.rows,"<<<<===")
        res.status(202).send("fetched data successfully")
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

        userId = req.userId
    
        const allTripes = await pool.query('SELECT * FROM trips');
        console.log(allTripes.rows,"===>>>")
        res.status(202).send("fetched data successfully")
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
module.exports = {createTrip,getUserAllTrip,updateUserStatus,updateUserAllTrip,getAllTrip}