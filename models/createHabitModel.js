const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const habitSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },

    title: {
        type: String,
        default: null
    },

    communities: {
        type: Array,
        default: null
    },

    referee: {
        type: Object,
        default: null
    },

}, { timestamps: true });

module.exports = model('habitSchema', habitSchema);