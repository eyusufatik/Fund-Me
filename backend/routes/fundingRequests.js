const express = require('express')
const {
  getFundingRequests, 
  getFundingRequest, 
  createFundingRequest, 
  deleteFundingRequest
} = require('../controllers/fundingRequestController')

const router = express.Router()

// GET all workouts
router.get('/', getFundingRequests)

// GET a single workout
router.get('/:id', getFundingRequest)

// POST a new workout
router.post('/', createFundingRequest)

// DELETE a workout
router.delete('/:id', deleteFundingRequest)

module.exports = router