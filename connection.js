const mongoose = require('mongoose');
require('dotenv').config()

const connectDb = async () =>{
   const connetions  = await mongoose.connect(process.env.MONGO_URI)
   if(connetions) console.log("Database connected");
   else console.log("Database not connected");
}

module.exports = {connectDb}