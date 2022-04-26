const express = require('express')

const app = express()

const PORT = 3000

app.set('view engine', 'ejs')

app.get('/movies', (req,res) =>{
    res.render('index.ejs')
})

app.get('/', (req,res) =>
    res.send("Welcome to Movie Page"))

app.listen(PORT, ()=>
    console.log(`Listening on port: ${PORT}`)
)