const mongoose6 = require('mongoose');


const messageSchema = new mongoose6.Schema({
from: { type: mongoose6.Schema.Types.ObjectId, ref: 'User', required: true },
to: { type: mongoose6.Schema.Types.ObjectId, ref: 'User', required: true },
subject: String,
body: String,
read: { type: Boolean, default: false },
sentAt: { type: Date, default: Date.now }
});


module.exports = mongoose6.model('Message', messageSchema);