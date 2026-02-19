const { v4: uuidv4 } = require("uuid");

module.exports = (req, res, next) => {
  req.correlator = uuidv4();
  next();
};
