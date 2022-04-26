// Import Mongoose Dependency
const mongoose = require('mongoose')

// Review Schema
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        required: [true, "You must provide a reason for your review"]
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'Movie',
    }
})

// Models Review Schema
const Review = mongoose.model('Review', reviewSchema)

// Export Review
module.exports = Review

