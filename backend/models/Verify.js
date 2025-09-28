
const mongoose = require("mongoose");


const verifySchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  code:{type:Number,required:true},
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt:{type:Date,default:()=>new Date(Date.now()+ 60*60*1000)}
});

module.exports = mongoose.model("Verify", verifySchema);