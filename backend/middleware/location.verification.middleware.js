const prisma = require("../prisma");

module.exports = async (req, res, next) => {

  const body = req.body;
  const correlator = req.correlator;   

  async function saveAndReturn(status, code, message) {

    if (correlator) {
      try {
        await prisma.camaraRequest.create({
          data: {
            correlator,
            apiName: "location-verification",
            phoneNumber: device?.phoneNumber || null,
            status: "FAILED",
            httpStatus: status,
            errorCode: code,
            errorMessage: message,
            completedAt: new Date()
          }
        });

        await prisma.locationVerificationResponse.create({
          data: {
            correlator,
            httpStatus: status,
            errorCode: code,
            errorMessage: message
          }
        });
      } catch (e) {
        console.error("DB logging failed:", e.message);
      }
    }

    return res.status(status).json({
      status,
      code,
      message
    });
  }

  //BASIC BODY

  if (!body || typeof body !== "object") {
    return saveAndReturn(
      400,
      "INVALID_ARGUMENT",
      "Client specified an invalid argument, request body or query param."
    );
  }

  const { device, area, maxAge } = body;

  /* ---------------- DEVICE ---------------- */

  if (!device || typeof device !== "object") {
    return saveAndReturn(400, "INVALID_ARGUMENT", "Missing device object.");
  }

  if (!device.phoneNumber || typeof device.phoneNumber !== "string") {
    return saveAndReturn(
      400,
      "INVALID_ARGUMENT",
      "Missing or invalid device.phoneNumber."
    );
  }

  /* ---------------- AREA ---------------- */

  if (!area || typeof area !== "object") {
    return saveAndReturn(400, "INVALID_ARGUMENT", "Missing area object.");
  }

  const { areaType, center, radius } = area;

  if (areaType !== "CIRCLE") {
    return saveAndReturn(
      400,
      "INVALID_ARGUMENT",
      "Only areaType=CIRCLE is supported."
    );
  }

  if (!center || typeof center !== "object") {
    return saveAndReturn(400, "INVALID_ARGUMENT", "Missing area.center.");
  }

  if (
    typeof center.latitude !== "number" ||
    typeof center.longitude !== "number"
  ) {
    return saveAndReturn(
      400,
      "INVALID_ARGUMENT",
      "center.latitude and center.longitude must be numbers."
    );
  }

  if (typeof radius !== "number" || radius <= 0) {
    return saveAndReturn(
      400,
      "INVALID_ARGUMENT",
      "radius must be a positive number."
    );
  }

  /* ---------------- MAX AGE ---------------- */

  if (maxAge !== undefined) {
    if (typeof maxAge !== "number" || maxAge < 0) {
      return saveAndReturn(
        400,
        "INVALID_ARGUMENT",
        "maxAge must be a positive number."
      );
    }
  }

  /* ---------------- NORMALIZE ---------------- */

  req.normalizedLocationRequest = {
    phoneNumber: device.phoneNumber,
    areaType,
    centerLatitude: center.latitude,
    centerLongitude: center.longitude,
    radius,
    maxAge
  };

  next();
};
