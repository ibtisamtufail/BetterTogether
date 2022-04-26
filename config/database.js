const mongoose = require('mongoose');

const mongoDBConnectFn = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connect Successfully');
    } catch (err) {
        console.log('Error while DB connection');
    }
}

module.exports = mongoDBConnectFn;