const {
  processLocationVerification,
} = require("../services/location.verification.service");

exports.handleLocationVerification = async (req, res, next) => {
  try {
    const result = await processLocationVerification(
      req.normalizedLocationRequest,
      req.correlator   
    );

    res.setHeader("X-Correlator-ID", req.correlator);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

