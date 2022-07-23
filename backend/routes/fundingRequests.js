const express = require('express')
const {
  getFundingRequests, 
  getFundingRequest, 
  createFundingRequest, 
  deleteFundingRequest
} = require('../controllers/fundingRequestController')

const router = express.Router()

router.get('/', getFundingRequests)

router.get('/:id', getFundingRequest)

router.post('/', createFundingRequest)

router.delete('/:id', deleteFundingRequest)

module.exports = router