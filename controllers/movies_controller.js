// import express
const express = require('express')
const methodOverride = require('method-override')


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
        // Need line to find all Reviews here
        const context = {
            movie: foundMovie,
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

module.exports = router