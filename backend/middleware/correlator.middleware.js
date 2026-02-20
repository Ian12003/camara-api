const { v4: uuidv4 } = require("uuid");

module.exports = (req, res, next) => {

  // Reuse correlator if client already sent one
  const incoming = req.headers["x-correlator-id"];

  if (incoming && typeof incoming === "string") {
    req.correlator = incoming;
  } else {
    req.correlator = uuidv4();
  }

  next();
};