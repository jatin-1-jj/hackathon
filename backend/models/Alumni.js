const mongoose = require("mongoose");



const alumniSchema = new mongoose.Schema({
  username: { type: String, require: true },
  name:{type:String,default: function () {
      return this.username;
    },},
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [, "alumni", "admin"],
    default: "alumni",
  },
  batch: { 
    type: Number,
    required:false
   },
  profession: {
    type: String,
    required:false
   },
  company: { 
    type: String,
    required:false
   },
  location: {
    type: String,
    required:false
   },
  linkedin: { type: String,
    required:false
   },
  bio: { 
    type: String 
},
  skills: [String],
  mentor: { 
    type: Boolean, 
    default: false 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
verified: { type: Boolean, default: false },
expiresAt:{type:Date,default:()=>new Date(Date.now()+14*24*60*60*1000)}
});

module.exports = mongoose.model("Alumni", alumniSchema);
