const mongoose = require('mongoose');

const connectDB = async ()=>{

    try {
        const db = await mongoose.connect(process.env.MONGO_URI||"",{});
        
        console.log(`db is connected`,db.connection.host);

    } catch (error) {
        console.log("database connection failed",error)
        process.exit(1);
    }
}

module.exports = {connectDB}

