const express = require('express')
const { getAllMovies, getMovieByTitle, checkInput, saveNewMovie } = require('./controllers/movies')
const bodyParser = require('body-parser')

const app = express()


app.get('/movies', getAllMovies)
app.get('/movies/:input', checkInput, getMovieByTitle)
app.post('/movies', bodyParser.json(), saveNewMovie)

app.all('*', (request, respone) => {
  return respone.status(404).send('Movie not found')
})

app.listen(1111, () => {
  console.log('Listening on port 1111...') // eslint-disable-line no-console
})
