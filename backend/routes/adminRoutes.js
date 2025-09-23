const express3 = require('express');
const User3 = require('../models/User');
// const Alumni3 = require('../models/Alumni');
// const Donation3 = require('../models/Donation');
const Membership3 = require('../models/Membership');
const { authMiddleware: auth2, adminOnly } = require('../middlewares/authMiddleware');


const router3 = express3.Router();


 
router3.get('/users', auth2, adminOnly, async (req, res) => {
try {
const users = await User3.find().select('-password');
res.json(users);
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});
router3.post('/verify/:userId', auth2, adminOnly, async (req, res) => {
try {
const user = await User3.findByIdAndUpdate(req.params.userId, { verified: true }, { new: true }).select('-password');
res.json({ message: 'User verified', user });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});

 
router3.post('/announcement', auth2, adminOnly, async (req, res) => {
try {
const { title, body } = req.body;
 
console.log('ANNOUNCEMENT:', title, body);
res.json({ message: 'Announcement created (no persistent model in this scaffold)', title, body });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
});
// router3.get('/donations', auth2, adminOnly, async (req, res) => {
// try {
// const donations = await Donation3.find().populate('donor', 'name email');
// res.json(donations);
// } catch (err) { res.status(500).json({ error: 'Server error' }); }
// });


router3.get('/memberships', auth2, adminOnly, async (req, res) => {
try {
const memberships = await Membership3.find().populate('userId', 'name email');
res.json(memberships);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});


module.exports = router3;