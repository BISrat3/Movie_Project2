const express = require('express')

const router = express.Router()

// Models - databases
const db = require('../models')

// index route - serve
router.get('/', async (req, res, next) => {
    try {
        const users = await db.User.find({})
        res.send(users)
    }
    catch(error){
        console.log(error)
        req.error = error
        return next()
    }
})

/// "New" route
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
        res.redirect('/users')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


module.exports = router