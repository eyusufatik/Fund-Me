const FundingRequest = require('../models/fundingRequestModel')
const mongoose = require('mongoose')

const getFundingRequests = async (req, res) => {
    const fundingRequests = await FundingRequest.find({}).sort({ createdAt: -1 })
    res.status(200).json(fundingRequests)
}

const getFundingRequest = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'No such funding request!' })
    }

    const fundingRequest = await FundingRequest.findById(id)
    if (!fundingRequest) {
        return res.status(404).json({ msg: 'No such funding request!' })
    }

    res.status(200).json(fundingRequest)
}

const createFundingRequest = async (req, res) => {
    const { title, text, address } = req.body

    const userId = req.user.user_id

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!text) {
        emptyFields.push('text')
    }

    if (!address) {
        emptyFields.push('address')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const fundingRequest = await FundingRequest.create({ userId, title, text, address })
        res.status(200).json(fundingRequest)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const deleteFundingRequest = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such funding request' })
    }

    const fundingRequest = await FundingRequest.findOneAndDelete({ _id: id })

    if (!fundingRequest) {
        return res.status(404).json({ msg: 'No such funding request!' })
    }

    res.status(400).json(fundingRequest)
}

module.exports = { getFundingRequests, getFundingRequest, createFundingRequest, deleteFundingRequest }