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
        console.log(movies)
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