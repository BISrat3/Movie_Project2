// import express
const express = require('express')
const router = express.Router()

// Models - databases
const db = require('../models')

// index route - serve
router.get('/', async (req, res, next) => {
    const allReviews = await db.Review.find({})
    .populate('movie user')
    .exec((error,allReviews) => {
        if(error){
            req.error = error
            return next()
        }
        db.Movie.find({}, (error, allMovies) => {
            if(error) {
                req.error = error
                return next()
            }
            const context = {
                reviews: allReviews,
                movies: allMovies,
            }
            return res.render('reviews/index.ejs',context)
        })
    })
})

// new route - review
router.get ('/new', async (req, res, next) => {
    try {
        const movies = await db.Movie.find({})
        const context = {movies: movies}
        res.render('reviews/new.ejs', context)
    } catch (error) {
        req.error = error
        return next()
    }
})

// create route - post - review
router.post ('/', async (req, res, next) => {
    try {
        const newReviewData = {
            ...req.body,
            user: req.session.currentUser.id,
        }
        const newReview = await db.Review.create(newReviewData, (error,createdReview) => {
            if (error) {
                req.error = error
                return next()
            }
        })
        res.redirect(`/reviews`)
    } catch (error) {
        req.error = error
        return next()
    }
})

// Show Route - Serving a show.ejs template
router.get ('/:reviewId', async (req, res, next) => {
    try {
        const foundReview = await db.Review.findById(req.params.reviewId)
        .populate('movie')
        const context = { review: foundReview }
        res.render('reviews/show.ejs', context)
    } catch (error) {
        req.error = error
        return next()
    }
})

// Edit Get Route - Serving a edit.ejs template
router.get ('/:reviewId/edit', async (req, res, next) => {
    try {
        const foundReview = await db.Review.findById(req.params.reviewId)
        const context = { review: foundReview }
        res.render('reviews/edit.ejs', context)
    } catch (error) {
        req.error = error
        return next()
    }
})

// Delete Route
router.delete('/:reviewId', async (req, res, next) =>{
    try {
        const deleteReview = await db.Review.findByIdAndDelete(req.params.reviewId)
        res.redirect(`/movies/${req.body.movieId}`)
    } catch (error) {
        req.error = error
        return next()
    }
})

// Update Put Route 
router.put ('/:reviewId', async (req, res, next) => {
    try {
        const movieId = req.body.movieId
        const updatedReview = await db.Review.findByIdAndUpdate(req.params.reviewId, req.body)
        return res.redirect(`/movies/${movieId}`)
    } catch (error) {
        req.error = error
        return next()
    }
})

// exports router
module.exports = router