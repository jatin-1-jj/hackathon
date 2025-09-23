const mongoose3 = require('mongoose');


const eventSchema = new mongoose3.Schema({
title: { type: String, required: true },
description: String,
date: { type: Date, required: true },
location: String,
createdBy: { type: mongoose3.Schema.Types.ObjectId, ref: 'User' },
participants: [{ type: mongoose3.Schema.Types.ObjectId, ref: 'User' }],
capacity: Number,
metadata: Object,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose3.model('Event', eventSchema);