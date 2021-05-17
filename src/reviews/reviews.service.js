const knex = require("../db/connection");

function list(movieId) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      return Promise.all(reviews.map(_addCritics));
    });
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => Promise.resolve(_addCritics(updatedReview)));
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

/* added helper function */
async function _addCritics(review) {
  review.critic = await knex("critics as c")
    .where({
      "c.critic_id": review.critic_id,
    })
    .first();
  return review;
}

module.exports = { list, read, update, destroy };
