const movies = require('../movies')

function checkInput(request, response, next) {
  if (!request.params.input) return response.sendStatus(400)

  request.params.input = request.params.input.toLowerCase()
  next()
}

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getMovieByTitle = (request, response) => {
  const { input } = request.params
  const foundMovieByTitle = movies.filter((movie) => movie.title.toLowerCase().includes(input))

  const getMovieByDirector = (movies.filter((movie) => {
    for (let director of movie.directors) {
      if (director.toLowerCase().includes(input)) {
        return true
      }
    }
  }))
  // eslint-disable-next-line max-len
  const foundMovie = getMovieByDirector.concat(foundMovieByTitle.filter((item) => getMovieByDirector.indexOf(item) < 0))

  return response.send(foundMovie)
}

const saveNewMovie = (request, response) => {
  const {
    title, directors, releaseDate, rating, runTime, genres
  } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    // eslint-disable-next-line max-len
    return response.status(400).send('The following fields are required: title, directors, releaseDate, rating, runTime, genres')
  }

  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres
  }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getMovieByTitle, checkInput, saveNewMovie }
