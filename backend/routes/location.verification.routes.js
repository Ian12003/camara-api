const express = require("express");
const router = express.Router();

const validateLocation =
  require("../middleware/location.verification.middleware");

const {
  handleLocationVerification
} = require("../controllers/location.verification.controller");

router.post(
  "/location-verification",
  validateLocation,             
  handleLocationVerification
);

module.exports = router;
