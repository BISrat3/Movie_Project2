// Import Mongoose Dependency
const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You must provide a your user name"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "You must provide a your password"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"]
    }
}, {timestamps: true }
)

// Models User Schema
const User = mongoose.model('User', userSchema)

// Export User
module.exports = User;
