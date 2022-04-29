const express = require('express')

const bcrypt = require('bcryptjs')

require('dotenv').config()

const router = express.Router()

// Models - databases
const db = require('../models')

// "New" sing In route
router.get('/signin', (req,res) => {
    res.render('users/signin.ejs')
})

// Post "User" route - Post SignIn route
router.post('/signin', async (req, res) => {
    try {
        // Check if user exists
        const foundUser = await db.User.findOne({username:req.body.username})
        console.log(foundUser)
        // If not, redirect to register
        if (!foundUser) return (res.redirect('/register'))
        // If the user exists, validate the user if passwords match -> SignIn
        // .compare(body password, hashed password) => return true or false
        const match = await bcrypt.compare(req.body.password, foundUser.password)
        // If not matched, send error
        if(!match) return res.send("Wrong password")
        // If match create the session and redirect to /home
        // Here we have created the key card
        req.session.currentUser ={
            id: foundUser._id,
            username: foundUser.username,
        }
        return res.redirect('/movies')
    } catch (error) {
        console.log(error);
        res.send(err)
    }
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
            // console.log(`You already have an account`)
            return res.redirect('/signin')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash
        const newUser= await db.User.create(req.body)
        return res.redirect('/signin')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get("/signout", async (req, res) => {
    try {
        await req.session.destroy();
        console.log(req.session);
        return res.redirect("/signin");
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

module.exports = router