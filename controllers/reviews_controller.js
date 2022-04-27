// import express
const express = require('express')

const router = express.Router()

// Models - databases
const db = require('../models')

// index route - serve
router.get('/', async (req, res, next) => {
    try {
        const allReviews = await db.Review.find({})
        res.send(allReviews)
    }
    catch(error){
        console.log(error)
        req.error = error
        return next()
    }
})

module.exports = router