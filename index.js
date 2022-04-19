const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./config/database');
require('dotenv').config();

// DB
DB();

// Middlewares
morgan('tiny');
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use("/api/user", require('./routes/userRoute'));

// Port Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));