const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//  const authRoutes = require('./routes/auth')
const http = require('http')

const {authRouter} = require('./routes/authRouter.js')
//const authRoutes = require('./routes/authRoutes');
const alumniRoutes = require('./routes/alumniRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const mentorshipRoutes = require('./routes/mentorshipRoutes.js');
const engagementRoutes = require('./routes/engagementRoutes.js');
const messageRoutes = require("./routes/messages.js");
const donationRoutes = require("./routes/donations.js");
const { connectDB } = require('./lib/mongoDB.js');


const dotenv = require('dotenv');
dotenv.config();

const originUrl = process.env.NODE_ENV==="development"?'http://localhost:5173':process.env.ORIGIN_URL
const app = express();
const server = http.createServer(app);

app.use(cors({
  origin:originUrl,
  credentials:true,
}));
app.use(express.json());
app.use(cookieParser());





app.use('/api/auth', authRouter);
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
server.listen(PORT, () => {
  connectDB()
  console.log(`🚀 Server running on port ${PORT}`)
});