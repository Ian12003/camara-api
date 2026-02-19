module.exports = (req, res, next) => {

  const body = req.body;

  //BASIC BODY
  if (!body || typeof body !== "object") {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "Client specified an invalid argument, request body or query param."
    });
  }

  const { device, area, maxAge } = body;

  //DEVICE 
  if (!device || typeof device !== "object") {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "Missing device object."
    });
  }

  if (!device.phoneNumber || typeof device.phoneNumber !== "string") {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "Missing or invalid device.phoneNumber."
    });
  }

  //AREA
  if (!area || typeof area !== "object") {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "Missing area object."
    });
  }

  const { areaType, center, radius } = area;

  if (areaType !== "CIRCLE") {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "Only areaType=CIRCLE is supported."
    });
  }

  if (!center || typeof center !== "object") {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "Missing area.center."
    });
  }

  if (
    typeof center.latitude !== "number" ||
    typeof center.longitude !== "number"
  ) {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "center.latitude and center.longitude must be numbers."
    });
  }

  if (typeof radius !== "number" || radius <= 0) {
    return res.status(400).json({
      status: 400,
      code: "INVALID_ARGUMENT",
      message: "radius must be a positive number."
    });
  }

  //MAX AGE
  if (maxAge !== undefined) {
    if (typeof maxAge !== "number" || maxAge < 0) {
      return res.status(400).json({
        status: 400,
        code: "INVALID_ARGUMENT",
        message: "maxAge must be a positive number."
      });
    }
  }

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
