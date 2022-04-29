// import express
const express = require('express')

const mongoose = require('mongoose')

const methodOverride = require('method-override')

const controllers = require('./controllers')

const session = require("express-session")

const MongoStore = require("connect-mongo")

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

// Application configuration
app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        // secret key is used to sign every cookie to say its is valid
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        },
    })
);

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