const express = require("express");
const dotenv = require("dotenv");

const healthRoutes = require("./routes/health.routes");
const errorHandler = require("./middleware/error.middleware");
const correlatorMiddleware = require("./middleware/correlator.middleware");
const locationVerificationRoutes = require("./routes/location.verification.routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(correlatorMiddleware);   

app.use("/api", healthRoutes);
app.use("/api", locationVerificationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Node.js backend API!" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
