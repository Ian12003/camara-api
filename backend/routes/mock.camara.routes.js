const express = require("express");
const router = express.Router();

router.post("/mock-camara/location-verification/v3/verify", (req, res) => {
  // Simulated telco response
  return res.status(200).json({
    verificationResult: "TRUE",
    matchRate: 95,
    lastLocationTime: new Date().toISOString()
  });
});

module.exports = router;