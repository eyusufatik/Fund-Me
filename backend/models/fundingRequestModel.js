const mongoose = require("mongoose");
const User = require('./userModel')

const fundingRequestSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true },
    title: { type: String, required: true},
    image: { type: String, default: null },
    text: { type: String, required: true }
})

module.exports = mongoose.model('FundingRequest', fundingRequestSchema)