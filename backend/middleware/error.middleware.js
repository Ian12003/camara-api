module.exports = (err, req, res, next) => {

  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    status,
    code: err.code || "INTERNAL_ERROR",
    message: err.message || "Unexpected server error"
  });
};
