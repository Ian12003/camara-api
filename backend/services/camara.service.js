const prisma = require("../prisma");

exports.createRequest = async (correlator) => {
  if (!correlator) {
    throw new Error("Correlator not received in service layer");
  }

  const result = await prisma.camaraRequest.create({
    data: {
      correlator: correlator,
      apiName: "health-check",
      status: "PENDING",
    },
  });
  console.log("Saved in DB:", result);
  return result;
};
