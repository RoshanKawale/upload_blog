const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://roshankawale2003:<password>@practice01.dpnonyf.mongodb.net/blogs?retryWrites=true&w=majority"

const connectDb = async () =>{
   const connetions  = await mongoose.connect(MONGO_URI)
   if(connetions) console.log("Database connected");
   else console.log("Database not connected");
}

module.exports = {connectDb}
