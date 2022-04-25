const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./config/database');
require('dotenv').config();

// DB
DB();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.get("/", (req, res) => {
    return res.json({ message: 'Server Running Successfully' });
});
app.use("/api/user", require('./routes/userRoute'));
app.use("/api/habitManage", require('./routes/habitManageRoute'));
app.use('/api/habit',require('./routes/habitRoute'));

// Port Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));