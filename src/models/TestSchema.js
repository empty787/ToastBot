const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    bal: {
        type: String,
        required: true,
        default: "100",
    },
    bank: {
        type: String,
        required: true,
        default: "0",
    },
    levelranking: {
        level: {
            type: String,
            required: true,
            default: "0",
        },
        xp: {
            type: String,
            required: true,
            default: "0",
        },
        backgroundrank: {
            type: String,
        },
        xpneeded: {
            type: String,
            required: true,
            default: "250",
        },
        total: {
            type: String,
            default: "0",
        },
    },
    cooldowns: {
        daily: {type: Date}
    }
})
module.exports = { User: mongoose.model("hiiii", User)}