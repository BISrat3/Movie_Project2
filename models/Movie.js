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
    directors: String,
    writers: String,
    stars: String,
    genres: String,
    tagline: String,
    runtimeMins: String,
    runtimeStr: String,
    companies: String,
    awards: String,
    contentRating: String,
    imDbRating: String,
    metacriticRating: String,
    similarsId: Array,
    similarsTitle: Array,
    similarsImage: Array,
    similarsImDbRating: Array
})

// Models Movie Schema
const Movie = mongoose.model('Movie', movieSchema)

// Export Movie
module.exports = Movie

