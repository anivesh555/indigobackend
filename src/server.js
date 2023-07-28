const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/index");
dotenv.config();
require("./Database/db")
const createUsersTable = require("./Database/tables")

const port = process.env.API_PORT || 8085;
let corsOptions = {
    origin : "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json())
createUsersTable()

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api", router);


// pool.on('connect', () => {
//     console.log('Connected to the database');
//   });


app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server is running 4000")
});