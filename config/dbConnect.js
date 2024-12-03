const mongoose = require('mongoose')
require('dotenv').config();

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() =>{
        console.log("Database Connected Successfully");
    })
    .catch((err) =>{
        console.log("Error Identified: ", err);
    })
}

module.exports = {connectDb,}