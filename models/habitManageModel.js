const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const habitManageSchema = new Schema({

    User: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },

    Title: {
        type: String,
        trim: true,
        default: null
    },

    Category: {
        type: String,
        trim: true,
        default: null
    },

    Description: {
        type: String,
        trim: true,
        default: null
    },

    AchievingDuration: {
        type: String,
        trim: true,
        default: null
    },

    BehaviorCriteria: {
        type: String,
        trim: true,
        default: null
    },

    Reminders: {
        type: Array,
        trim: true,
        default: null
    },

    Trigger: {
        type: Array,
        trim: true,
        default: null
    },

    ReportingTime: {
        type: String,
        trim: true,
        default: null
    },

    DefinitionOfDone: {
        type: Number,
        default: 0
    },

    RefereeDetails: {
        type: Object,
        default: null
    },

    Stakes: {
        type: Number,
        default: 0
    },

    DonationBodyDetail: {
        type: String,
        default: null
    },

    Inspiration: {
        type: Schema.Types.ObjectId,
        ref: "userSchema"
    },

    ShareWithFriends: {
        type: Array,
        default: null
    },

}, { timestamps: true });

module.exports = model('habitManageSchema', habitManageSchema);