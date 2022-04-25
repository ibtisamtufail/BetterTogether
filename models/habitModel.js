const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const habitSchema = new Schema({

    User: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },

    Title: {
        type: String,
        default: null
    },

    Communities: {
        type: Array,
        default: null
    },

    Referee: {
        type: Object,
        default: null
    },

}, { timestamps: true });

module.exports = model('habitSchema', habitSchema);