// import express
const express = require('express')

const mongoose = require('mongoose')

const methodOverride = require('method-override')

const controllers = require('./controllers')

// create instance
const app = express()

// configure the app settings 
const PORT = 3000

// Connection to MongoDB
require('./config/db.connection');

// app configs 
app.set('view engine', 'ejs')

// Middleware to access public directory
app.use(express.static('public'))

// convert a get/post request to a delete (or put) request
app.use(methodOverride('_method'))

// body-parser middleware
app.use(express.urlencoded({ extended: false }))

//Controllers
app.use('/movies', controllers.movies)

// Reviews Router
app.use('/reviews', controllers.reviews)

// Users Router
app.use('/users', controllers.users)

// "Home" route
app.get('/', (req,res) =>
    res.send("Welcome to Movie Page"))

app.listen(PORT, ()=>
    console.log(`Listening on port: ${PORT}`))