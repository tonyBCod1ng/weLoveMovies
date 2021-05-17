const knex = require("../db/connection");

function list(movieId) {
  return knex("theaters as t")
    .modify((query) => {
      if (movieId) {
        query
          .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
          .where({ "mt.movie_id": movieId });
      }
    })
    .then((theaters) => {
      if (movieId) {
        return theaters;
      }
      return Promise.all(theaters.map(_addMovies));
    });
}

/* added helper function below */

async function _addMovies(theater) {
  theater.movies = await knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.theater_id": theater.theater_id });
  return theater;
}

module.exports = { list };
