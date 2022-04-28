// Import Mongoose Dependency
const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        
    },
    password: String,
})

// Models User Schema
const User = mongoose.model('User', userSchema)

// Export User
module.exports = User
