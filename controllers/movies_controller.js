// import express
const express = require('express')

const router = express.Router()

// Models - databases
const db = require('../models')

// "Index" route
router.get('/', async (req, res, next) =>{
    try {
        const movies = await db.Movie.find({})
        const context = { movies }
        res.render('index.ejs', context)
    } catch (error) {
        console.log(error)
        req.error = error
        return next()
    }
})

// "New" route
router.get('/new', (req,res) => {
    res.render('new.ejs')
})

router.get('/:id', async (req, res, next) => {
    try {
        const foundMovie = await db.Movie.findById(req.params.id)
        const reviews = await db.Review.find({product: req.params.id})
        console.log(reviews.length, 'Reviews Found');
        const context = {
            movie: foundMovie,
            reviews: reviews,
        }
        res.render('show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Post "New" route
router.post('/', async (req, res, next) => {
    try {
        const createMovie = await db.Movie.create(req.body)
        console.log(createMovie)
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// "Edit" route
router.get('/:id/edit', async (req, res, next) => {
    try {
        const updateMovie = await db.Movie.findById(req.params.id)
        console.log(updateMovie)
        return res.render('edit.ejs', {movie: updateMovie})
    } catch (error){
        console.log(error)
        req.error =error
        return next()
    }
})

// Delete Route
router.delete('/:id', async (req, res, next) =>{
    try {
        const deleteMovie = await db.Movie.findByIdAndDelete(req.params.id)
        res.redirect('/movies')
    } catch (error) {
        req.error = error
        return next()
    }

})

// Update route - put - movies
router.put('/:id', async (req, res, next) => {
    try {
        const updatedMovie = await db.Movie.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('/movies');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

module.exports = router 