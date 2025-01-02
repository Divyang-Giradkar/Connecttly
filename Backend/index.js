const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const AdminRoutes = require('./routes/adminRoutes');
const UserRoutes = require('./routes/userRoutes');
const EventRoutes = require('./routes/eventRoutes');
const companyRoutes = require('./routes/companyRoutes');
const communicationRoutes = require('./routes/commuctionRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', AdminRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/commuction', communicationRoutes);

// Database connection
mongoose.connect("mongodb+srv://divyanggiradkar2:divyang@calander.bmpsq.mongodb.net/?retryWrites=true&w=majority&appName=Calander")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Database connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
