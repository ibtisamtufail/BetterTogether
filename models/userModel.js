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
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        trim: true,
    },

    address: {
        type: String,
        trim: true,
    },

    country: {
        type: String,
        trim: true,
    },

    city: {
        type: String,
        trim: true,
    },

    state: {
        type: String,
        trim: true,
    },

}, { timestamps: true });

module.exports = model('userSchema', userSchema);