const express = require("express");
const {
  locationVerificationMiddleware
} = require("../middleware/location.verification.middleware");

const router = express.Router();

router.post(
  "/location-verification/v3/verify",
  locationVerificationMiddleware
);

module.exports = router;