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

// new route - review
router.get ('/new', async (req, res, next) => {
    try {
        const users = await db.User.find({})
        console.log(users)
        const context = {users: users}
        res.render('users/new.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router