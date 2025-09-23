const mongoose5 = require('mongoose');


const membershipSchema = new mongoose5.Schema({
userId: { type: mongoose5.Schema.Types.ObjectId, ref: 'User', required: true },
type: { type: String, enum: ['basic', 'premium'], default: 'basic' },
validTill: Date,
paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose5.model('Membership', membershipSchema);