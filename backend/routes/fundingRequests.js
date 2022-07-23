const express = require('express')
const {
  getFundingRequests, 
  getFundingRequest, 
  createFundingRequest, 
  deleteFundingRequest
} = require('../controllers/fundingRequestController')

const onlyAdmins = require('../middleware/onlyAdmins')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', getFundingRequests)

router.get('/:id', getFundingRequest)

router.post('/', auth, createFundingRequest)

router.delete('/:id', auth, onlyAdmins, deleteFundingRequest)

module.exports = router