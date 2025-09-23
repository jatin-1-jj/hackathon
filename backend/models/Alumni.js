const mongoose2 = require('mongoose');


const alumniSchema = new mongoose2.Schema({
userId: { type: mongoose2.Schema.Types.ObjectId, ref: 'User', required: true },
batch: Number,
profession: String,
company: String,
location: String,
linkedin: String,
bio: String,
skills: [String],
mentor: { type: Boolean, default: false },  
mentee: { type: Boolean, default: false },  
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose2.model('Alumni', alumniSchema);