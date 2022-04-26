// Import Mongoose Dependency
const mongoose = require('mongoose')

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "You must provide a movie title"],
    },
    image: String,
    releaseDate: Date,
    plot: String,
    year: String,
    director: String,
    stars: String,
    genre: [],
})

// Models Movie Schema
const Movie = mongoose.model('Movie', movieSchema)

// Export Movie
module.exports = Movie

