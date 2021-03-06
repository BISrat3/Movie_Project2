// import dependencies
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

// Models - databases
const db = require('../models')

// "New" Sign In route
router.get('/signin', (req,res) => {
    res.render('users/signin.ejs')
})

// Post "User" route - Post Sign In route
router.post('/signin', async (req, res) => {
    try {
        // Check if user exists
        const foundUser = await db.User.findOne({username:req.body.username})
        if (!foundUser) return (res.redirect('/register'))
        const match = await bcrypt.compare(req.body.password, foundUser.password)
        if(!match) 
        return res.redirect('/wrong')
        req.session.currentUser ={
            id: foundUser._id,
            username: foundUser.username,
        }
        return res.redirect('/movies')
    } catch (error) {
        res.send(err)
    }
})

// wrong password page
router.get('/wrong', (req,res) =>{
    res.render('users/wrong.ejs')
})

// "New" route - Register Route
router.get('/register', (req,res) => {
    res.render('users/register.ejs')
})

// Post "New User registration" route - Post Register Route
router.post('/register', async (req, res, next) => {
    try {
        const foundUser = await db.User.exists({username: req.body.username})
        if (foundUser){
            return res.redirect('/signin')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash
        const newUser= await db.User.create(req.body)
        return res.redirect('/signin')
    } catch (error) {
        req.error = error
        return next()
    }
})

// signout route
router.get("/signout", async (req, res) => {
    try {
        await req.session.destroy()
        return res.redirect("/signin")
    } catch (error) {
        return res.send(error)
    }
});

// export router
module.exports = router