const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//  const authRoutes = require('./routes/auth')
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes')
//const authRoutes = require('./routes/authRoutes');
const alumniRoutes = require('./routes/alumniRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const mentorshipRoutes = require('./routes/mentorshipRoutes.js');
const engagementRoutes = require('./routes/engagementRoutes.js');
const messageRoutes = require("./routes/messages.js");
const donationRoutes = require("./routes/donations.js");
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI ||`mongodb+srv://jatinjangra7417_db_user:AlumniDb@cluster0.qmtioij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

 
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/engagement', engagementRoutes);
app.use("/api/messages", messageRoutes);
// app.use('/api/auth', authRoutes)
app.use("/api/donations", donationRoutes);
app.get('/', (req, res) => res.send('Alumni Backend Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));