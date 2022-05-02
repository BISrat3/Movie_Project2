// import express
const express = require('express')
const axios = require('axios')
const router = express.Router()

// Models - databases
const db = require('../models')
const { populate } = require('../models/Movie')

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

// "Search" route
router.post('/s', async (req, res, next) => {
    const queryOptions = {
        params: {
            s: req.body.search,
            apikey: process.env.KEY
        }
    };
    // Tells axios to go to this url, and add the query options
    axios.get('http://www.omdbapi.com', queryOptions)
        .then(function (response) {
            // res.send(response.data)          // Prints out database in browser
            // res.send(response.data.Search[0])   // Prints out first data obj in browser
            let context = {
                movieData: response.data
            }
            res.render('search.ejs', context);
        })
})

// Imdb Show route
router.get('/s/:imdbId', async (req, res, next) => {
    // Tells axios to go to this url
    axios.get(`http://www.imdb-api.com/en/API/Title/${process.env.imdbKEY}/${req.params.imdbId}`)
        .then(function (response) {
            let context = {
                imdbData: response.data
            }
            res.render('result.ejs', context);
        })
})

//"show" route by Id
router.get('/:id', async (req, res, next) => {
    try {
        const foundMovie = await db.Movie.findById(req.params.id)
        const reviews = await db.Review.find({product: req.params.id})
        .populate('user')
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
        return res.render('edit.ejs', {movie: updateMovie})
    } catch (error){
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

// export router
module.exports = router 