const prisma = require("../prisma");

/* ----------------- HELPERS ----------------- */

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (v) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ----------------- SERVICE ----------------- */

exports.processLocationVerification = async (payload, correlator) => {
  if (!correlator) {
    throw {
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Correlator missing",
    };
  }

  const { phoneNumber, centerLatitude, centerLongitude, radius, maxAge } =
    payload;

  /* =========================================================
     1️⃣ CREATE BASE REQUEST FIRST (OUTSIDE TRANSACTION)
  ========================================================= */

  await prisma.camaraRequest.create({
    data: {
      correlator,
      apiName: "location-verification",
      phoneNumber,
      status: "PENDING",
    },
  });

  try {
    /* =========================================================
       2️⃣ BUSINESS LOGIC (INSIDE TRANSACTION)
    ========================================================= */

    const result = await prisma.$transaction(async (tx) => {
      const device = await tx.telcoDevice.findUnique({
        where: { msisdn: phoneNumber },
        include: { location: true },
      });

      if (!device) {
        throw {
          status: 404,
          code: "IDENTIFIER_NOT_FOUND",
          message: "Device identifier not found.",
        };
      }

      if (!device.supportsLocation) {
        throw {
          status: 422,
          code: "SERVICE_NOT_APPLICABLE",
          message: "Service not available.",
        };
      }

      if (!device.location) {
        throw {
          status: 404,
          code: "LOCATION_NOT_AVAILABLE",
          message: "No location available.",
        };
      }

      if (maxAge !== undefined) {
        const ageSeconds =
          (Date.now() - device.location.lastSeenAt.getTime()) / 1000;

        if (ageSeconds > maxAge) {
          throw {
            status: 422,
            code: "LOCATION_TOO_OLD",
            message: "Last known location is older than maxAge.",
          };
        }
      }

      const distance = getDistanceMeters(
        centerLatitude,
        centerLongitude,
        device.location.latitude,
        device.location.longitude,
      );

      let verificationResult = "FALSE";
      let matchRate = null;

      if (distance <= radius) {
        verificationResult = "TRUE";
      } else if (distance <= radius * 1.2) {
        verificationResult = "PARTIAL";
        matchRate = Math.round(Math.max(0, 100 - (distance / radius) * 100));
      }

      await tx.locationVerificationRequest.create({
        data: {
          correlator,
          areaType: "CIRCLE",
          centerLatitude,
          centerLongitude,
          radius,
          maxAge,
        },
      });

      await tx.locationVerificationResponse.create({
        data: {
          correlator,
          verificationResult,
          matchRate,
          lastLocationTime: device.location.lastSeenAt,
          httpStatus: 200,
        },
      });

      return {
        verificationResult,
        lastLocationTime: device.location.lastSeenAt,
        ...(matchRate !== null && { matchRate }),
      };
    });

    /* =========================================================
       3️⃣ UPDATE SUCCESS
    ========================================================= */

    await prisma.camaraRequest.update({
      where: { correlator },
      data: {
        status: "COMPLETED",
        httpStatus: 200,
        completedAt: new Date(),
      },
    });

    return result;
  } catch (err) {
    /* =========================================================
       4️⃣ UPDATE ERROR OUTSIDE TRANSACTION
    ========================================================= */

    await prisma.camaraRequest.update({
      where: { correlator },
      data: {
        status: "FAILED",
        httpStatus: err.status || 500,
        errorCode: err.code || "INTERNAL_ERROR",
        errorMessage: err.message,
        completedAt: new Date(),
      },
    });
    //Prevent duplicate response rows if service retries:
    await prisma.locationVerificationResponse.upsert({
      where: { correlator },
      update: {
        httpStatus: err.status || 500,
        errorCode: err.code,
        errorMessage: err.message,
      },
      create: {
        correlator,
        verificationResult: null,
        httpStatus: err.status || 500,
        errorCode: err.code,
        errorMessage: err.message,
      },
    });

    throw err;
  }
};
