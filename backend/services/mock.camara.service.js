async function mockLocationVerification(body) {
  return {
    status: 200,
    data: {
      verificationResult: "TRUE",
      matchRate: 95,
      lastLocationTime: new Date().toISOString()
    }
  };
}

module.exports = { mockLocationVerification };