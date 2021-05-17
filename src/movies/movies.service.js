const knex = require("../db/connection");

async function list(isShowing) {
  if (isShowing) {
    return await _listMovies();
  }
  return knex("movies").select("*");
}

async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

function _listMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*", "m.movie_id as id")
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

module.exports = { list, read };
