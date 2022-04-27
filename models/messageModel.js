const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const messageSchema = new Schema({

    group: {
        type: Schema.Types.ObjectId,
        ref: 'groupSchema',
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema',
    },

    message: {
        type: String,
        trim: true,
    },

}, { timestamps: true });

module.exports = model('messageSchema', messageSchema);