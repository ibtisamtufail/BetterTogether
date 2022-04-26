const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const habitManageSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },

    title: {
        type: String,
        trim: true,
        default: null
    },

    category: {
        type: String,
        trim: true,
        default: null
    },

    description: {
        type: String,
        trim: true,
        default: null
    },

    achievingDuration: {
        type: String,
        trim: true,
        default: null
    },

    behaviorCriteria: {
        type: String,
        trim: true,
        default: null
    },

    reminders: {
        type: Array,
        trim: true,
        default: null
    },

    trigger: {
        type: Array,
        trim: true,
        default: null
    },

    reportingTime: {
        type: String,
        trim: true,
        default: null
    },

    definitionOfDone: {
        type: Number,
        default: 0
    },

    refereeDetails: {
        type: Object,
        default: null
    },

    stakes: {
        type: Number,
        default: 0
    },

    donationBodyDetail: {
        type: String,
        default: null
    },

    inspiration: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },

    shareWithFriends: {
        type: Array,
        default: null
    },

}, { timestamps: true });

module.exports = model('habitManageSchema', habitManageSchema);