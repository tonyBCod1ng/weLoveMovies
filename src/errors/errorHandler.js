module.exports = function (error, req, res, next) {
  const { status = 500, message = `Error!` } = error;
  res.status(status).json({ error: message });
};
