const express5 = require('express');
const Payment = require('../models/Payment');
const Donation5 = require('../models/Donation');
const Membership5 = require('../models/Membership');
const { authMiddleware: auth4 } = require('../middlewares/authMiddleware');


const router5 = express5.Router();



router5.post('/create', auth4, async (req, res) => {
try {
const { amount, purpose, metadata } = req.body;


if (!amount || !purpose) return res.status(400).json({ error: 'amount and purpose required' });


const payment = new Payment({ userId: req.user._id, amount, purpose, metadata });
await payment.save();



payment.status = 'successful';
await payment.save();
if (purpose === 'donation') {
const don = new Donation5({ donor: req.user._id, amount, message: metadata && metadata.message });
await don.save();
}


 
if (purpose === 'membership') {
const type = metadata && metadata.type ? metadata.type : 'basic';
const validTill = new Date();
validTill.setFullYear(validTill.getFullYear() + (type === 'premium' ? 1 : 0));


await Membership5.findOneAndUpdate({ userId: req.user._id }, { type, validTill, paymentStatus: 'paid' }, { upsert: true });
}


res.json({ message: 'Payment successful (mock)', payment });
} catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});


module.exports = router5;