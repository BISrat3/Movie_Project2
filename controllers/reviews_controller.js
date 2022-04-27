// import express
const express = require('express')

const router = express.Router()

// Models - databases
const db = require('../models')

// index route - serve
router.get('/', async (req, res, next) => {
    try {
        const reviews = await db.Review.find({})
        res.send(reviews)
    }
    catch(error){
        console.log(error)
        req.error = error
        return next()
    }
})

// new route - review
router.get ('/new', async (req, res, next) => {
    try {
        const movies = await db.Movie.find({})
        console.log(movies)
        const context = {movies: movies}
        res.render('reviews/new.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// create route - post - review
router.post ('/', async (req, res, next) => {
    // res.send('Hitting Review Create')
    try {
        const newReviewData = req.body
        const newReview = await db.Review.create(newReviewData)
        console.log(newReview)
        // Return user to movie detail page
        res.redirect(`/movies/${newReview.movie}`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



module.exports = router