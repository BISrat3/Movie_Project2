const express = require('express')

const bcrypt = require('bcryptjs')

const router = express.Router()

// Models - databases
const db = require('../models')

// "New" route
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})

// Post "User" route
router.post('/', async (req, res, next) => {
    try {
        const newUserData = req.body
        console.log(req.body)
        const newUser= await db.User.create(newUserData)
        console.log(newUser)
        res.redirect('/movies')

    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// "New" sing In route
router.get('/signin', (req,res) => {
    res.render('users/signin.ejs')
})

module.exports = router