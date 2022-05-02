// import express
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const controllers = require('./controllers')
const session = require("express-session")
const MongoStore = require("connect-mongo")
const navLinks = require('./navLinks')

// create instance
const app = express()

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

// Authentication middleware
const authRequired = function (req, res, next) {
    if (req.session.currentUser) {
      return next();
    }
  
    return res.redirect("/signin");
  };

// Application configuration
app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        },
    })
);

// Nav Links Middleware
app.use(navLinks)

app.use(function (req, res, next){
    res.locals.user = req.session.currentUser
    next()
})

//Controllers
app.use('/movies', controllers.movies)

// Reviews Router
app.use('/reviews', authRequired, controllers.reviews)

// Users Router
app.use('/', controllers.users)

// "Home" route
app.get('/', (req,res) => {
    res.redirect('/movies')
})

app.listen(process.env.PORT, ()=>
    console.log(`Listening on port: ${process.env.PORT}`))