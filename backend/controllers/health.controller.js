const camaraService = require("../services/camara.service");

exports.getHealth = async (req, res, next) => {
  try {
    const result = await camaraService.createRequest(req.correlator);
    res.json(result);
    console.log("Correlator:", req.correlator);

  } catch (err) {
    next(err);
  }
};
