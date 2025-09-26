const mongoose = require("mongoose");



const alumniSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  mentee: { 
    type: Boolean, 
    default: false 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("Alumni", alumniSchema);
