require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./config/database');

// create server
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Database
DB();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
    return res.json({ message: 'Server Running Successfully' });
});
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/habitManage', require('./routes/habitManageRoute'));
app.use('/api/habit', require('./routes/createHabitRoute'));
app.use('/api/group', require('./routes/groupRoute'));
app.use('/api/message', require('./routes/messageRoute'));
app.use('/api/funds', require('./routes/fundsRoute'));

// sockets
io.on('connection', socket => {
    socket.on('joinRoom', (groupID) => {
        socket.join(groupID);
    });
    socket.on('chatMessage', (msg, groupID) => {
        io.to(groupID).emit('message', msg);
    });
});

// Port Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));