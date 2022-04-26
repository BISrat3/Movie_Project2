// import express
const express = require('express')

// create instance
const app = express()

// configure the app settings 
const PORT = 3000

// app configs 
app.set('view engine', 'ejs')

// "Index" route
app.get('/movies', (req,res) =>{
    res.render('index.ejs')
})

// "Home" route
app.get('/', (req,res) =>
    res.send("Welcome to Movie Page"))

app.listen(PORT, ()=>
    console.log(`Listening on port: ${PORT}`))