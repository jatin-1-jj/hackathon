const mongoose4 = require('mongoose');


const donationSchema = new mongoose4.Schema({
donor: { type: mongoose4.Schema.Types.ObjectId, ref: 'User', required: true },
amount: { type: Number, required: true },
message: String,
date: { type: Date, default: Date.now }
});


module.exports = mongoose4.model('Donation', donationSchema);