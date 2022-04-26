// import express
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// create instance
const app = express()

// configure the app settings 
const PORT = 3000

// Models - databases
const db = require('./models')

// app configs 
app.set('view engine', 'ejs')

// body-parser middleware
app.use(express.urlencoded({ extended: false }))

// "Index" route
app.get('/movies', (req,res) =>{
    res.render('index.ejs')
})

// "New" route
app.get('/movies/new', (req,res) => {
    res.render('new.ejs')
})

// Post "New" route
app.post('/movies', (req, res) => {
    console.log(req.body)
    res.send(req.body)
    // try {
    //     const createMovie = await db.Movie.create(req.body)
    //     console.log(createMovie)
    //     res.redirect('/movies')
    // } catch (error) {
    //     console.log(error);
    //     req.error = error;
    //     return next();
    // }
})

// "Home" route
app.get('/', (req,res) =>
    res.send("Welcome to Movie Page"))

app.listen(PORT, ()=>
    console.log(`Listening on port: ${PORT}`))