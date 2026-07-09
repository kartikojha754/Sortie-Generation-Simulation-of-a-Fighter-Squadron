require("dotenv").config();

const express = require("express");
const cors = require("cors");

// DB connection removed / disabled.
// Existing DB files can stay in project, but are no longer used.

const simulationRoutes = require("./routes/simulationRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Sortie Generation Simulation API is running.",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Sortie Generation Simulation Backend",
    storage: "JSON File Storage",
  });
});

app.use("/api/simulation", simulationRoutes);
app.use("/api/history", historyRoutes);

module.exports = app;
