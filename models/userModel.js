const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
    },

    phone: {
        type: String,
        trim: true,
        default: null
    },

    address: {
        type: String,
        trim: true,
        default: null
    },

    country: {
        type: String,
        trim: true,
        default: null
    },

    city: {
        type: String,
        trim: true,
        default: null
    },

    state: {
        type: String,
        trim: true,
        default: null
    },

    role: {
        type: String,
        default: 'user'
    }

}, { timestamps: true });

module.exports = model('userSchema', userSchema);