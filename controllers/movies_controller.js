// import express
const express = require('express')

const router = express.Router()

// Models - databases
const db = require('../models')

// "Index" route
router.get('/', (req,res) =>{
    res.render('index.ejs')
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