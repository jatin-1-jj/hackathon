const mongoose7 = require('mongoose');


const paymentSchema = new mongoose7.Schema({
userId: { type: mongoose7.Schema.Types.ObjectId, ref: 'User' },
amount: Number,
purpose: String,  
status: { type: String, enum: ['initiated', 'successful', 'failed'], default: 'initiated' },
metadata: Object,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose7.model('Payment', paymentSchema);