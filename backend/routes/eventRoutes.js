const express4 = require('express');
const Event = require('../models/Event');
const { authMiddleware: auth3, adminOnly: adminOnly2 } = require('../middlewares/authMiddleware');


const router4 = express4.Router();


// Create event (admin or alumni can create depending on policy)
router4.post('/', auth3, async (req, res) => {
try {
const { title, description, date, location, capacity } = req.body;
if (!title || !date) return res.status(400).json({ error: 'Title and date required' });


const ev = new Event({ title, description, date, location, capacity, createdBy: req.user._id });
await ev.save();
res.status(201).json(ev);
} catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});
router4.put('/:id', auth3, async (req, res) => {
try {
const ev = await Event.findById(req.params.id);
if (!ev) return res.status(404).json({ error: 'Event not found' });
if (ev.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')
return res.status(403).json({ error: 'Not authorized to update' });


Object.assign(ev, req.body);
await ev.save();
res.json(ev);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});
router4.delete('/:id', auth3, async (req, res) => {
try {
const ev = await Event.findById(req.params.id);
if (!ev) return res.status(404).json({ error: 'Event not found' });
if (ev.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')
return res.status(403).json({ error: 'Not authorized to delete' });


await ev.remove();
res.json({ message: 'Event deleted' });
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});
router4.get('/', async (req, res) => {
try {
const events = await Event.find().sort({ date: 1 }).populate('createdBy', 'name email');
res.json(events);
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});
router4.post('/:id/participate', auth3, async (req, res) => {
try {
const ev = await Event.findById(req.params.id);
if (!ev) return res.status(404).json({ error: 'Event not found' });
if (ev.participants.includes(req.user._id)) return res.status(400).json({ error: 'Already participating' });
if (ev.capacity && ev.participants.length >= ev.capacity) return res.status(400).json({ error: 'Event full' });


ev.participants.push(req.user._id);
await ev.save();
res.json({ message: 'Registered for event', event: ev });
} catch (err) { res.status(500).json({ error: 'Server error' }); }
});


module.exports = router4;