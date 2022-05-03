# Movie App

## Description 
Browser application inspired by [imdb](https://www.imdb.com/). Allows users to search and view movie details.
Allows users to search movies using API databases ([imdb-api](https://imdb-api.com/), [omdb-api](http://www.omdbapi.com/)). 
Allows users to rate and leave reviews to selected movies.

## Technologies Used
HTML | CSS | JavaScript | Express | EJS | Mongoose | MongoDB | Axios | Bcryptjs | [imdb-api](https://imdb-api.com/) | [omdb-api](http://www.omdbapi.com/)

## Wireframes
<img width="705" alt="Screen Shot 2022-05-02 at 4 08 51 PM" src="https://user-images.githubusercontent.com/99110345/166318309-50468d33-474a-4899-b339-33af6bb6a450.png">

## Models
<img width="938" alt="models 1" src="https://user-images.githubusercontent.com/99110345/166248074-8ac80962-35b8-4165-85ea-aa0ca3651ea4.png">

## User Stories
- As a user, I want to see all the movies in the database.
- As a user, I want to select a movie & see all its details.
- As a user, I want to have the ability to create a new review.
- As a user, I want to have the ability to edit/update a review.
- As a user, I want to have the ability to delete a review.

## MVP
- Set up Express Boilerplate
- Set up MongoDB

- Create Movie Schema
  - Index page (all movies in database)
  - Show page (one movie, details, reviews)
  - New page (create new movie for database)
  - Edit page (edit movie from database)
  - Store movie objects into MongoDB

- Create Review Schema
  - Index page (all reviews in database)
  - Show page (one review, details)
  - New page (create new review for database)
  - Edit page (edit review from database)
  - Store review objects into MongoDB

- Link Reviews to single Movie
- Adjust Movies & Reviews routes to match user story

- Create User Schema
  - Register page (create new user for database)
  - Store user objects into MongoDB
  - SignIn page (allow user to sign in using existing data in database)
  - User session object

## Stretch Goals
- User movie list
  - index page (all movies in list)
  - new page (create new movie list)
  - edit page (update movie list)

- Link OMDB-api & imdb-api to application
  - Find movie data using APIs
  - Store movie data from imdb-api into MongoDB

- Link Reviews to single User
  - User authentication needed for specific controller routes

## Deployed Heroku App
[Heroku Deployment](https://movie-app-1305.herokuapp.com/)

## Installation
- Application Usage
  - [Navigate to deployed web app](https://movie-app-1305.herokuapp.com/)
  - Search for movies and add to movie database
  - Register to write/edit/delete reviews

- Contributor Usage
  - Fork and Clone Repo to your local repository
  - Intitalize Repo (npm init)
  - Install dependencies (npm i)
  - env (MongoDB_URI, PORT, imdb-api key, omdb-api key)
  - Create development branch
  - Make pull request

## Contributors
[Bisrat Amtataw](https://github.com/BISrat3), [Marc De Chavez](https://github.com/mdechavez5)
