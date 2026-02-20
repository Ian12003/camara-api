const axios = require("axios");
const prisma = require("../prisma");
const { mockLocationVerification } = require("../services/mock.camara.service");

const locationVerificationMiddleware = async (req, res) => {

  const correlator = req.correlator;

  try {

    const phoneNumber = req.body.device?.phoneNumber;

    const areaType = req.body.area?.areaType;
    const centerLatitude = req.body.area?.center?.latitude;
    const centerLongitude = req.body.area?.center?.longitude;
    const radius = req.body.area?.radius;

    const maxAge = req.body.maxAge;

    // store camara request
    await prisma.camaraRequest.create({
      data: {
        correlator,
        apiName: "location-verification",
        phoneNumber
      }
    });

    // store location request
    await prisma.locationVerificationRequest.create({
      data: {
        correlator,
        areaType,
        centerLatitude,
        centerLongitude,
        radius,
        maxAge
      }
    });

    // forward SAME body to CAMARA / mock
    const camaraResponse = await mockLocationVerification(req.body);

    // store response
    await prisma.locationVerificationResponse.create({
      data: {
        correlator,
        verificationResult: camaraResponse.data.verificationResult,
        matchRate: camaraResponse.data.matchRate,
        lastLocationTime: camaraResponse.data.lastLocationTime,
        httpStatus: camaraResponse.status
      }
    });

    await prisma.camaraRequest.update({
      where: { correlator },
      data: {
        status: "COMPLETED",
        httpStatus: camaraResponse.status,
        completedAt: new Date()
      }
    });

    return res.status(camaraResponse.status).json(camaraResponse.data);

  } catch (error) {

    await prisma.camaraRequest.update({
      where: { correlator },
      data: {
        status: "FAILED",
        httpStatus: error.response?.status || 500,
        completedAt: new Date()
      }
    });

    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "CAMARA error" });
  }
};

module.exports = { locationVerificationMiddleware };