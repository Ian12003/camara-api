const prisma = require("../prisma");

exports.processLocationVerification = async (payload, correlator) => {
  if (!correlator) {
  throw {
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Correlator missing"
    };
}

  const {
    phoneNumber,
    areaType,
    centerLatitude,
    centerLongitude,
    radius,
    maxAge
  } = payload;

  return await prisma.$transaction(async (tx) => {

    // Save Base Request
    await tx.camaraRequest.create({
      data: {
        correlator,
        apiName: "location-verification",
        phoneNumber,
        status: "PENDING"
      }
    });

    // Save Request Payload
    await tx.locationVerificationRequest.create({
      data: {
        correlator,
        areaType,
        centerLatitude,
        centerLongitude,
        radius,
        maxAge
      }
    });

    // Mock CAMARA Network Call
    const camaraResponse = {
      verificationResult: "TRUE",
      matchRate: 97,
      lastLocationTime: new Date()
    };

    // Save Response
    await tx.locationVerificationResponse.create({
      data: {
        correlator,
        verificationResult: camaraResponse.verificationResult,
        matchRate: camaraResponse.matchRate,
        lastLocationTime: camaraResponse.lastLocationTime,
        httpStatus: 200
      }
    });

    // Update Base Request
    await tx.camaraRequest.update({
      where: { correlator },
      data: {
        status: "COMPLETED",
        httpStatus: 200,
        completedAt: new Date()
      }
    });

    return {
      correlator,
      result: camaraResponse
    };

  });
};

