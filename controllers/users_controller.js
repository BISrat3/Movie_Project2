const express = require('express')

const bcrypt = require('bcryptjs')

const router = express.Router()

// Models - databases
const db = require('../models')
const { User } = require('../models')

// "New" route
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})

// Post "New User registration" route
router.post('/', async (req, res, next) => {
    try {
        const foundUser = await User.exists({username: req.body.username})
        if (foundUser){
            return res.redirect('users/signin')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash
        const newUser= await User.create(req.body)
        return res.redirect('/movies')
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

// Post "User" route
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findOne({username:req.body.username})
        console.log(foundUser)
        if (!foundUser)
        return (res.redirect('users/new'))
        const match = await bcrypt.compare(req.body.password, foundUser.password)
        if(!match) 
        return res.send("Wrong password")
        req.session.currentUser ={
            id:foundUser._id,
            username:foundUser.username,
        }
        return res.redirect('/movies')
    } catch (error) {
        console.log(error);
        res.send(err)
    }
})

module.exports = router