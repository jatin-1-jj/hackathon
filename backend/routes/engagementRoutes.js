const express7 = require('express');
const Message7 = require('../models/Message');
const { authMiddleware: auth6 } = require('../middlewares/authMiddleware');


const router7 = express7.Router();


 
router7.post('/message', auth6, async (req, res) => {
try {
const { to, subject, body } = req.body;
if (!to || !body) return res.status(400).json({ error: 'recipient and body required' });


const msg = new Message7({ from: req.user._id, to, subject, body });
await msg.save();
 
res.status(201).json({ message: 'Message sent', msg });
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});
router7.get('/inbox', auth6, async (req, res) => {
try {
const msgs = await Message7.find({ to: req.user._id }).populate('from', 'name email');
res.json(msgs);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});


 
router7.get('/sent', auth6, async (req, res) => {
try {
const msgs = await Message7.find({ from: req.user._id }).populate('to', 'name email');
res.json(msgs);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});


module.exports = router7;