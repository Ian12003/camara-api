const express = require("express");
const dotenv = require("dotenv");

const healthRoutes = require("./routes/health.routes");
const correlatorMiddleware = require("./middleware/correlator.middleware");
const locationVerificationRoutes = require("./routes/location.verification.routes");
const mockCamaraRoutes = require("./routes/mock.camara.routes");
dotenv.config();

const app = express();

app.use(express.json());

// attaches correlator to every request
app.use((req, res, next) => {
  if (req.path.startsWith("/internal")) {
    return next();
  }
  correlatorMiddleware(req, res, next);
});
// routes
app.use("/api", healthRoutes);
app.use("/api", locationVerificationRoutes);
app.use("/internal", mockCamaraRoutes);
// root
app.get("/", (req, res) => {
  res.json({ message: "CAMARA Middleware Running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});