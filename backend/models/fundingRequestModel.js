const mongoose = require("mongoose");
const User = require('./userModel')

const fundingRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('FundingRequest', fundingRequestSchema)