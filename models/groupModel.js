const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const groupSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },

    title: {
        type: String,
        trim: true,
        default: null
    },
    profile: {
        type: String,
        trim: true,
        default: 'uploads\\groupProfiles\\131-1318812_avatar-group-icon.png'
    },
    category: {
        type: String,
        trim: true,
        default: null
    },
    members: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'userSchema'
            },
        },
    ],
    referee: {
        member: {
            type: Schema.Types.ObjectId,
            ref: 'userSchema'
        },
    },
    stakes: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'userSchema'
            },
            stakeValue: {
                type: Number,
                default: null
            }
        }
    ],
    stakesPercentage: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'userSchema'
            },
            percentage: {
                type: Number,
                default: null
            }
        }
    ],
    thresHold: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'userSchema'
            },
            thresholdValue: {
                type: Number,
                default: null
            }
        }
    ],
    reports: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'userSchema'
            },
            report: {
                type: String,
                default: null
            }
        }
    ]

}, { timestamps: true });

module.exports = model('groupSchema', groupSchema);