const mongoose = require("mongoose");



const adminSchema = new mongoose.Schema({
  username: { type: String, require: true },
  name:{type:String,default: function () {
      return this.username; 
    },},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "admin",
  },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt:{type:Date,default:()=>new Date(Date.now()+3*24*60*60*1000)}
});

module.exports = mongoose.model("Admin", adminSchema);
