// require a mongoose 
const mongoose = require('mongoose')

// getting access to .env
require('dotenv').config()

const connectionStr = process.env.MONGODB_URI

mongoose.connect(connectionStr)

// mongoDB connection on success
mongoose.connection.on('connected', () =>[
    console.log(`[${new Date().toLocaleTimeString()}]- connected 🙌 🙌 🙌`)
])

// mongoDB connection on error
mongoose.connection.on ('error', (error) =>[
    console.log('MongoDB Connection error', error)
])

// disconnection from mongoDB
mongoose.connection.on ('disconnected', () =>[
    console.log('MongoDB disconnected ⚡️ 🔌 ⚡️')
])