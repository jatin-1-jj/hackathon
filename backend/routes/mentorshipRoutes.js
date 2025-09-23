const express6 = require('express');
const Alumni6 = require('../models/Alumni');
const { authMiddleware: auth5 } = require('../middlewares/authMiddleware');


const router6 = express6.Router();


 
router6.post('/toggle-mentor', auth5, async (req, res) => {
try {
const alumni = await Alumni6.findOneAndUpdate({ userId: req.user._id }, { mentor: req.body.mentor === true }, { new: true, upsert: true });
res.json(alumni);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});
router6.get('/search-mentors', auth5, async (req, res) => {
try {
const { skill, company, batch } = req.query;
const filters = { mentor: true };
if (skill) filters.skills = { $in: [new RegExp(skill, 'i')] };
if (company) filters.company = new RegExp(company, 'i');
if (batch) filters.batch = batch;


const mentors = await Alumni6.find(filters).populate('userId', 'name email');
res.json(mentors);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});


module.exports = router6;